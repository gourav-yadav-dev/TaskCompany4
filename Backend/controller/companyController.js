const Company = require('../model/companyModel');

exports.createCompany = async (req, res) => {
  try {
    const { companyName, location, foundedOn, city, description } = req.body;
    const logoPath = req.file ? req.file.path : null;
    
const existCompany=await Company.findOne({companyName})
if(existCompany){
  return res.status(400).json({message:'Company exits'})
}
    const newCompany = new Company({
      companyName,
      location,
      foundedOn,
      city,
      description,
      logoPath
    });

    await newCompany.save();
    res.status(201).json({ message: 'Company saved successfully', company: newCompany });
  } catch (error) {
    console.error('Error saving company:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
exports.listCompany = async (req, res) => {

  try {
    const companyList = await Company.find({})
    if (!companyList) {
      return res.status(201).json({ message: 'No Comapany' })
    }
    return res.status(200).json({ data: companyList })


  }
  catch (error) {
    return res.status(500).json({ message: 'Server Error' })
  }

}
exports.findCompany = async (req, res) => {
  const { companyName } = req.body
  console.log(companyName)
  try {
    const existCompany = await Company.findOne({ companyName })
    if (!companyName) {
      return res.status(400).json({ message: 'Not found' })
    }

    return res.status(200).json({ message: existCompany })


  }
  catch (error) {
    return res.status(500).json({ message: 'Server Error' })
  }


}

exports.companyLocation = async (req, res) => {
  // console.log(req.body)
  const { location } = req.body
  console.log(location)
  try {
    const existLocation = await Company.find({ $or: [{ location }, { city: location }] })
    console.log(existLocation)
    if (!existLocation) {
      return res.status(200).json({ message: 'Location not found' })
    }

    return res.status(200).json({ data: existLocation })

  }
  catch (error) {
    return res.status(500).json({ message: 'Server error' })
  }


}