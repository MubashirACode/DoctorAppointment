import jwt from 'jsonwebtoken'

// doctor  authentication middleware


const authDoctor = async (req, res, next) => {


    try {

        const { dtoken } = req.headers

        if (!dtoken) {
            return res.json({ success: false, message: "Not Authorized Login Again " })
        }

        // Decode Token

        const token_decode = jwt.verify(dtoken, process.env.JWT_SECRET)

        req.body.docId = token_decode.id

        next();


        // Decode Token
    } catch (error) {
        console.error("An error occurred :", error);
        return res.status(500).json({ success: false, error: "Failed to Admin Login" });
    }

}

export default authDoctor