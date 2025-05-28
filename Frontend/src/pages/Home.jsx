import { FaMapMarkerAlt, FaPlus, FaSearch, FaStar } from "react-icons/fa";
// import { FaMapMarkerAlt } from 'react-icons/fa';
import { AiOutlineCalendar } from 'react-icons/ai';
import { useState, useEffect } from "react";
import { useFormik } from 'formik'
import { Link } from 'react-router-dom'
import axios from 'axios'
import '../App.css'
export function Home() {
    const [showModal, setShowModal] = useState(false);
    const [searchCompany, setSearchcompany] = useState('');
    const [load, reload] = useState(false)
    const [company, setcompany] = useState([{ city: '', companyName: '', description: '', location: '', logoPath: '', foundedOn: '', rating: [], review: [] }])
    const formik = useFormik({
        initialValues: {
            companyName: '',
            location: '',
            foundedOn: '',
            city: '',
            description: '',
            logo: null


        },
        validate: value => {
            const errors = {}
            if (value.companyName == '') {
                errors.companyName = 'Required'
            }
            else if (value.companyName.length < 4) {
                errors.companyName = 'Company name is too short'
            }
            if (value.location == '') {
                errors.location = 'Required'
            }

            if (value.city == '') {
                errors.city = 'Required'
            }
            else if (value.city.length < 4) {
                errors.city = 'Too Short'
            }
            if (value.description == '') {
                errors.description = 'Required'
            }

            return errors;
        },

        onSubmit: async (value) => {
            console.log('hello')
            const formData = new FormData();
            formData.append("companyName", value.companyName);
            formData.append("location", value.location);
            formData.append("foundedOn", value.foundedOn);
            formData.append("city", value.city);
            formData.append("description", value.description);

            if (value.logo) formData.append("logo", value.logo);
            try {
                await axios.post('http://127.0.0.1:3240/companyList', formData)
                    .then(document => {
                        // console.log(document)
                        alert("Company added successfully!");
                    }).catch(error=>{
                        alert(error.response.data.message)
                    })

                // console.log(formData)
                fetchCompany()
                setShowModal(false);
                formik.resetForm();
            } catch (error) {
                console.error("Failed to submit form:", error);
                alert("Something went wrong!");
            }

        },
        validateOnChange: true,
        validateOnBlur: true,

    })
    const handleFileChange = (e) => {
        formik.setFieldValue("logo", e.currentTarget.files[0])
    }

    const fetchCompany = () => {
        axios.get('http://127.0.0.1:3240/showcompanyList').then(document => {
            setcompany(document.data.data)
        })
    }
    function handleSearch(e) {
        setSearchcompany(e.target.value)
    }
    function SearchClick() {
        // console.log(searchCompany)
        if (searchCompany.length == 0) {
            alert('Please Enter Location');
            return;
        }
        const location = searchCompany;
        // console.log(location)
        axios.post('http://127.0.0.1:3240/location', { location }).then(document => {
            if (document.data.data.length == 0) {
                alert('Not found')
                fetchCompany()
            }
            setcompany(document.data.data)

        }).catch(error => {
            alert(error)
        })
    }

    useEffect(() => {
        fetchCompany()
    }, [])
    const getAverageRating = (ratings) => {
        if (!ratings || ratings.length === 0) return 0;
        const sum = ratings.reduce((a, b) => a + b, 0);

        return sum / ratings.length;
    };

    return (
        <>
            <div className="w-[100%] lg:w-4/5   mx-auto mt-10  ">
                <div className=" flex justify-between flex-col xl:flex-row  border-b-1 mx-2 overflow-hidden   ">
                    <div className=" flex items-center  justify-between w-full gap-4 ">
                        <div className="flex flex-col ">
                            <label htmlFor="">Select city</label>
                            <div className="flex justify-between w-full items-center ">
                                <div className="flex items-center border rounded-md px-2 py-1 w-60 sm:w-100 me-1 lg:me-8 ">
                                    <input
                                        type="text"
                                        placeholder="Search..."
                                        className="w-full outline-none px-2 py-1 text-sm"
                                        onChange={handleSearch}
                                    />
                                    <FaSearch className="text-purple-600" />
                                </div>
                                <div >
                                    <button onClick={SearchClick} className="bg-purple-600 whitespace-nowrap text-white px-4 py-2 rounded shadow hover:bg-purple-700 transition " >Find Company</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className=" lg:p-5 mb-2 flex flex-col  w-full  mt-2 align-middle ">
                        <div className="flex justify-end">
                            <label className="me-20">Sort:</label>
                        </div>
                        <div className="flex justify-between gap-4 ">
                            <button className="bg-purple-600 text-white  py-2 rounded shadow hover:bg-purple-700 transition flex  items-center px-1 whitespace-nowrap" onClick={() => setShowModal(true)} ><FaPlus className="mx-1" />Add Company</button>
                            <select className="border px-4 rounded">
                                <option >Name</option>
                                <option >Average</option>
                                <option >Rating</option>
                                <option >Location</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className="mt-16 p-2">
                    <div className="mb-3">Result Found 1</div>
                    {/* <img src={`http://localhost:3240/${data.logoPath}`}></img> */}
                    {
                        company.map(data => <div key={data.companyName} className="grid grid-cols-1 shadow z-10 mb-10 p-2 lg:grid-cols-2 ">
                            <div className="flex">
                                <div >
                                    <img src={`http://localhost:3240/${data.logoPath}`} className="w-40 lg:w-20 h-20" />
                                </div>
                                <div className="ms-2">
                                    <div>
                                        <div className="font-black">{data.companyName}</div>
                                        <div className="font-light">{data.location} |{data.city}</div>
                                    </div>
                                    <div className="flex my-3">
                                        <div className="flex items-center">
                                            <span>{!(getAverageRating(data.rating).toFixed(1) == 0) ? getAverageRating(data.rating).toFixed(1) : <></>}</span>
                                            {[1, 2, 3, 4, 5].map((star) => {
                                                const avgRating = getAverageRating(data.rating);

                                                return (
                                                    <>
                                                        <FaStar
                                                            key={star}
                                                            className={`text-lg ${star <= avgRating
                                                                ? 'text-yellow-400 '
                                                                : star - 0.5 <= avgRating
                                                                    ? 'text-yellow-300'
                                                                    : 'text-gray-300'
                                                                }`}
                                                        />
                                                    </>
                                                );

                                            })}
                                        </div>

                                        <div className="mx-3 font-bold">{data.review.length}<span className="mx-1">Review</span></div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex lg:flex-col justify-between lg:justify-around items-end">
                                <div className="font-light"><span className="lg:me-1">Founded on:</span>{data.foundedOn}</div>
                                <div>
                                    <Link to={`/detail/${data.companyName}`} className="bg-black text-white px-4 py-1 rounded">Detail Review</Link>
                                </div>
                            </div>
                        </div>)
                    }
                </div>
            </div>

            {showModal && (
                <div className="fixed inset-0 z-50 bg-black/50 flex  justify-center px-2 lg:px-0  ">
                    <div className="bg-white rounded-3xl shadow-lg  max-w-md p-6 h-144 mt-20 relative ">

                        <button
                            className="absolute top-7 right-4 text-4xl   cursor-pointer"
                            onClick={() => setShowModal(false)}>
                            &times;
                        </button>


                        {/* <div className="absolute top-0 -left-0 w-15 h-20   bg-gradient-to-br from-purple-600 to-purple-300 rounded-r-full opacity-100 " /> */}
                        <img src="group.png" alt="" width="100px" height="100px" className="absolute top-0 -left-0" />




                        <h2 className="text-2xl font-semibold text-center mb-6 z-10 relative mt-3">Add Company</h2>


                        <form className="space-y-4 h-120 overflow-auto" onSubmit={formik.handleSubmit}>
                            <div>
                                <label className="text-sm font-medium">Company name</label>
                                <input
                                    type="text"
                                    placeholder="Enter..."
                                    className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
                                    name="companyName" onChange={formik.handleChange}
                                />
                                <div className="font-mono mt-1" style={{ color: 'red' }}>{formik.errors.companyName}</div>
                            </div>

                            <div>
                                <label className="text-sm font-medium">Location</label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        placeholder="Select Location"
                                        className="w-full mt-1 px-4 py-2 border rounded-lg pr-10 focus:outline-none focus:ring-2 focus:ring-purple-400"
                                        name="location"
                                        onChange={formik.handleChange}
                                    />
                                    <FaMapMarkerAlt className="absolute right-3 top-3 text-gray-400" />
                                    <div className="font-mono mt-1" style={{ color: 'red' }}>{formik.errors.location}</div>
                                </div>
                            </div>

                            <div>
                                <label className="text-sm font-medium">Founded on</label>
                                <div className="relative">
                                    <input
                                        type="date"
                                        placeholder="DD/MM/YYYY"
                                        className="w-full mt-1 px-4  py-2 border rounded-lg p-14 focus:outline-none focus:ring-2 focus:ring-purple-400"
                                        name="foundedOn" onChange={formik.handleChange}
                                    />
                                    <div className="font-mono mt-1" style={{ color: 'red' }}>{formik.errors.foundedOn}</div>
                                    {/* <AiOutlineCalendar className="absolute right-3 top-3 text-gray-400" /> */}
                                </div>
                            </div>

                            <div>
                                <label className="text-sm font-medium">City</label>
                                <input
                                    type="text"
                                    className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
                                    placeholder="City"
                                    name="city"
                                    onChange={formik.handleChange}
                                />
                                <div className="font-mono mt-1" style={{ color: 'red' }}>{formik.errors.city}</div>
                            </div>
                            <div>
                                <label className="text-sm font-medium">Description</label>
                                <textarea

                                    className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
                                    name="description"
                                    onChange={formik.handleChange}
                                />

                            </div>

                            <div>
                                <label className="text-sm font-medium">Logo</label>
                                <input
                                    type="file" required
                                    className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
                                    name="logo"
                                    onChange={handleFileChange}
                                />

                            </div>

                            <button
                                type="submit"
                                className="w-full py-2 mt-4 rounded-lg bg-gradient-to-r from-purple-600 to-blue-500 text-white font-medium"
                            >
                                Save
                            </button>
                        </form>
                    </div>

                </div>
            )}
        </>
    )
}