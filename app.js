import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/" , (req , res) => {
    res.render("index.ejs"
        , {posts: posts
});
})

app.post("/new" , (req, res) => {
    res.render("new.ejs");
    
})




//

let posts = [];

app.post("/createpost" , (req , res) => {
    const newposts = {
        id : posts.length + 1,
        title : req.body.title,
        content : req.body.content
    }
    posts.push(newposts);
    console.log(posts);
    // Go back to home page
    res.redirect("/");
})

app.get("/edit/:id" , (req , res) => {
    const id = Number(req.params.id);
    const post = posts.find((post) => post.id === id);

     console.log("URL ID:", id);
    console.log("FOUND POST:", post);

    if (!post) {
        return res.send("Post not found");
    }

    res.render("edit.ejs", { posts: post });
});

app.post("/edit/:id" , (req , res) => {
    const id = Number(req.params.id);
    const post = posts.find((post) => post.id === id);
     
    if(!post) {
        return res.send("Post not found");
    }

    post.title = req.body.title,
    post.content = req.body.content
    
    res.redirect("/");
});

app.post("/delete/:id" , (req , res) => {
    const id = Number(req.params.id);
    posts = posts.filter((post) => post.id !== id);

    res.redirect("/");
});
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
