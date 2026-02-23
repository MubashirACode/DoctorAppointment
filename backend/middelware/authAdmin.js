import jwt from 'jsonwebtoken'

// admin  authentication middleware


const authAdmin = async (req, res, next) => {


    try {

        const { atoken } = req.headers

        if (!atoken) {
            return res.json({ success: false, message: "Not Authorized Login Again " })
        }

        // Decode Token

        const token_decode = jwt.verify(atoken, process.env.JWT_SECRET)

        if (token_decode !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD) {
            return res.json({ success: false, message: "Not Authorized Login Again " })
        }

        next();


        // Decode Token
    } catch (error) {
        console.error("An error occurred :", error);
        return res.status(500).json({ success: false, error: "Failed to Admin Login" });
    }

}

export default authAdmin