const express = require('express');
const router = express.Router();
const albumShema = require('../models/album.m')
const authenticate = require('../middlewares.js/authenticate')

router.post('/addAlbum', authenticate, async function (req, res) {
    const artist = req.user;
    let Album = await albumShema.create({
        name: req.body.name,
        artist: artist._id,
        year: req.body.year,
        genre: req.body.genre,
        songs: req.body.songs,
        artistimg: req.body.artistimg,
        artistname: req.body.artistname,
        albumimg: req.body.albumimg
    })
    const totalPages = Math.ceil(
        (await albumShema.find().countDocuments().lean().exec()) / 5
    );
    return res.status(200).send({
        Album,totalPages
    })
})
router.get("/getId", authenticate, async function (req, res) {
    let user = req.user;
    return res.status(200).send({
        user
    })
})
router.get("/getalbum/:idA", async function (req, res) {

    try {
        const album = await albumShema.findById(req.params.idA)
        return res.status(200).send({
            album
        })
    } catch (error) {
        console.log('error:', error)
    }
})
router.delete("/delete/:id", authenticate, async function (req, res) {

    try {
        await albumShema.findByIdAndDelete(req.params.id)
        return res.status(200).send({
            "deleted": '1'
        })
    } catch (error) {
        console.log('error:', error)
    }
})
router.patch('/editAlbum/:id', authenticate, async function (req, res) {
    let Album = await albumShema.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        year: req.body.year,
        genre: req.body.genre,
        artistimg: req.body.artistimg,
        artistname: req.body.artistname,
        albumimg: req.body.albumimg
    })
    return res.status(200).send({
        Album
    })
})
router.get("/allAllbum:name", async function (req, res) {
    let Albmus = await albumShema.find()
})
router.get("/allAllbumSelf/data",authenticate, async function (req, res) {
    let user=req.user
    const page = +req.query.page || 1;
    const size = +req.query.limit || 5;
    const year = +req.query.year || 1;
    let genr =req.query.genre;
    const offset = (page - 1) * size;
    const name = req.query.name
    const self=req.query.self 
    let data
    if (name != "" || genr != "") {
        let Albmus = await albumShema.find({artist:user._id}).sort(
            [
                ['year', year],
            ]).lean().exec();
            // console.log(Albmus);
        Albmus = Albmus.filter((x) =>
            x.name.toLowerCase().includes(name.toLowerCase()) &&
            x.genre.toLowerCase().includes(genr.toLowerCase())
        )
        Albmus=Albmus.slice(offset,offset+size)
        const totalPages = Math.ceil(
            (Albmus.length+1)/size
        );
        if (Albmus.length == 0) return res.status(200).send({
            message: "artiest dnt have any students"
        });
        // console.log(Albmus.length,totalPages);
        return res.send({
            Albmus,
            totalPages
        })
    }else{
        let Albmus = await albumShema.find({artist:user._id}).sort(
            [
                ['year', year]
            ]).skip(offset).limit(size).lean().exec();
        const totalPages = Math.ceil(
            (await albumShema.find({artist:user._id}).countDocuments().lean().exec()) / size
        );
        if (Albmus.length == 0) return res.status(200).send({
            message: "artiest dnt have any students"
        });
        return res.send({
            Albmus,
            totalPages
        })
    }
})
router.get("/allAllbum", async function (req, res) {
    const page = +req.query.page || 1;
    const size = +req.query.limit || 5;
    const year = +req.query.year || 1;
    let genr =req.query.genre;
    const offset = (page - 1) * size;
    const name = req.query.name
    let data
    // console.log(genr,year);
    if (name != "" || genr != "" ) {
        let Albmus = await albumShema.find().sort(
            [
                ['year', year],
            ]).lean().exec();
        Albmus = Albmus.filter((x) =>
            x.name.toLowerCase().includes(name.toLowerCase()) &&
            x.genre.toLowerCase().includes(genr.toLowerCase())
        )
        Albmus=Albmus.slice(offset,offset+size)
        const totalPages = Math.ceil(
            (Albmus.length+1)/size
        );
        if (Albmus.length == 0) return res.status(200).send({
            message: "artiest dnt have any students"
        });
        return res.send({
            Albmus,
            totalPages
        })
    }
    else{
        let Albmus = await albumShema.find().sort(
            [
                ['year', year]
            ]).skip(offset).limit(size).lean().exec();
        const totalPages = Math.ceil(
            (await albumShema.find().countDocuments().lean().exec()) / size
        );
        if (Albmus.length == 0) return res.status(200).send({
            message: "artiest dnt have any students"
        });
        return res.send({
            Albmus,
            totalPages
        })
    }
})

router.patch("/songedit/:idA/ii/:i", async function (req, res) {   
   
    let al=await albumShema.findById(req.params.idA)

    let ar=al.songs
 
    let filteredAry = ar.filter(e => e !==ar[req.params.i])
    // console.log('filteredAry:', filteredAry)
    
    let Album = await albumShema.findByIdAndUpdate(req.params.idA, {
        songs:filteredAry
    })
    // console.log(Album);
    return res.status(200).send({
        "ss":"s"})
})

router.patch("/songedit/:idA/ii/:i/d/:du/s/:sname", async function (req, res) {   
   
    let al=await albumShema.findById(req.params.idA)

    let ar=al.songs
    ar[req.params.i]=[req.params.sname,req.params.du]
    console.log(ar);
    let Album = await albumShema.findByIdAndUpdate(req.params.idA, {
        songs:ar
    })
    // console.log(Album);
    return res.status(200).send({
        "ss":"s"})
})

router.patch("/songadd/:idA/ii/:i/d/:adddur/s/:addname", async function (req, res) {   
   
    let al=await albumShema.findById(req.params.idA)

    let ar=al.songs
    ar.push([req.params.addname,req.params.adddur])
    let Album = await albumShema.findByIdAndUpdate(req.params.idA, {
        songs:ar
    })
    // console.log(Album);
    return res.status(200).send({
        "ss":"s"})
})

module.exports = router