import jwt from "jsonwebtoken"



export function authUser(req, res, next) {

    const token = req.cookies.token

    if (!token) {
        return res.status(401).json({
            message: "Unauthorized access",
            success: false,
            err: "token not provided"
        })
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decoded
        next()
    } catch (error) {
        res.status(500).json({
            err: error
        })
    }

}