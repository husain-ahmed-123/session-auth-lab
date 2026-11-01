const express = require("express");
const router = express.Router();

const Entry = require("../models/Entry.js");
const isSignedIn = require("../middleware/is-signed-in.js");

// Part 3: Display new entry form
router.get("/new", isSignedIn, (req, res) => {
  res.render("new-entry.ejs");
});

// Part 4: Create a new entry
router.post("/", isSignedIn, async (req, res) => {
  console.log(req.session.user);

  await Entry.create({
    title: req.body.title,
    entryBody: req.body.entryBody,
    isPublic: req.body.isPublic === "on",
    owner: req.session.user._id,
  });

  res.redirect("/entries");
});

// Part 5: Display public entries
router.get("/", async (req, res) => {
  const entries = await Entry.find({ isPublic: true });

  res.render("all-entries.ejs", { entries });
});
// Part 6: My Entries
router.get("/my-entries", isSignedIn, async (req, res) => {
  const entries = await Entry.find({
    owner: req.session.user._id,
  });

  res.render("my-entries.ejs", { entries });

  console.log(error);
  res.redirect("/");
});
module.exports = router;
