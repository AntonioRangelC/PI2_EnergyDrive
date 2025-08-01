// Purpose: Verify the code sent to the user's telegram account



const verifyTelegramCode = async (req,res)=>{


    try{

        console.log(req.body)
      
        const code = await TelegramSaver.findOne({verificationCode:req.body.code})
        if(code){
            return res.status(200).json({chatId:code.chatId})
        }else{

            return res.status(401).json({message:"Invalid or Unauthorized"})
        }


    }catch(error){
        console.log(error)
    }
}

