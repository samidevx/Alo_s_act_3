const jwt =require('jsonwebtoken');

router.post("/login",async(req,res)=>{

    let user = req.body;

    if(user.username==="user" && user.password==="123"){

        const accessToken=jwt.sign({username:user.password},"secret");
        res.status(201).send(accessToken)

    }else {
         res.status(502).json({error:"Wrong username or Password"})
         }    
})