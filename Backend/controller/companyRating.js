const Company = require('../model/companyModel');


module.exports = async (req, res) => {
    const { name, Rating, companyName, reviewsubject, reviewtext } = req.body
    console.log(`${name},${Rating},${companyName},${reviewsubject},${reviewtext}`)
    try {
        const companyReview = await Company.updateOne({ companyName }, { $push: { rating: Rating, review: { name, reviewsubject, reviewtext, createdAt: new Date(), rating: Rating } } })
        return res.status(200).json({ message: 'Add Review' })
    }
    catch (error) {
        return res.status(500).json({ message: 'Server error' })
    }



}