import { useNavigate, useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { FaMapMarkerAlt, FaPlus, FaSearch, FaStar } from "react-icons/fa";
import { useFormik } from "formik";

import axios from 'axios'
export function Detail() {
    const [showModal, setShowModal] = useState(false);
    const companyName = useParams()
    const [rating, setrating] = useState(0)
    // console.log(companyName)
    const [company, setcompany] = useState([{ city: '', companyName: '', description: '', location: '', logoPath: '', foundedOn: '', rating: [], review: [{ name: '', reviewsubject: '', reviewtext: '', createAt: Date(), rating: 0 }] }])
    // const [fulldetail, setfulldetail] = useState([{ city: '', companyName: '', description: '', location: '', logoPath: '', foundedOn: '', rating: [], review: [] }])
    const FetchData = () => {
        axios.post('http://127.0.0.1:3240/specficCompany', companyName)
            .then(document => {
                const res = document.data.message;
                const safeArray = Array.isArray(res) ? res : [res];
                setcompany(safeArray)
            })
            .catch(error => {
                alert(error)
            })
    }
    useEffect(() => {
        FetchData()
    }, [])
    const formik = useFormik({
        initialValues: {
            name: '',
            reviewsubject: '',
            reviewtext: ''
        },
        validate: value => {
            const errors = {}
            if (!value.name) {
                errors.name = "Required"
            }
            else if (value.name.length < 3) {
                errors.name = "Name must be at least 3 characters"
            }

            if (value.reviewsubject.length == 0) {
                errors.reviewsubject = "Required"
            }
            else if (value.reviewsubject.length < 3) {
                errors.reviewsubject = "Name is too short"
            }

            if (value.reviewtext.length == 0) {
                errors.reviewtext = "Required"
            }
            else if (value.reviewtext.length < 3) {
                errors.reviewtext = "Name is too short"
            }
            return errors

        },
        onSubmit: value => {
            value.companyName = companyName.companyName
            value.Rating = rating
            axios.post('http://127.0.0.1:3240/rating', value).then(document => {
                alert('Add Review Successfully...')
                setShowModal(false)
                FetchData()
            })
        }
    })
    const getAverageRating = (ratings) => {
        if (!ratings || ratings.length === 0) return 0;
        const sum = ratings.reduce((a, b) => a + b, 0);
        return sum / ratings.length;
    };
    const getReview = (review) => {
        if (review.length == 0) return 0;
        // console.log(review)
        const sum = review.reduce((a, b) => a + b, 0)
        // console.log(sum)
        return sum;
    }
    return (
        <>
            <div className="w-100 lg:w-4/5  mx-auto mt-10">
                <div className="mt-16 p-2 shadow z-10">
                    {
                        (company).map(data =>
                            <div className="grid grid-cols-1  mb-2 p-2 lg:grid-cols-2 border-b-1 " key={data.companyName}>
                                <div className="flex ">
                                    <div >
                                        <img src={`http://localhost:3240/${data.logoPath}`} className="w-40 lg:w-20 h-20" />
                                    </div>
                                    <div className="ms-2">
                                        <div>
                                            <div className="font-black">{data.companyName}</div>
                                            <div className="font-light">{data.location} |{data.city}</div>
                                        </div>
                                        <div className="flex mt-3">
                                            <div className="flex items-center ">
                                                <span>{!(getAverageRating(data.rating).toFixed(1) == 0) ? getAverageRating(data.rating).toFixed(1) : <></>}</span>
                                                {[1, 2, 3, 4, 5].map((star) => {
                                                    const avgRating = getAverageRating(data.rating);
                                                    <span>{avgRating}</span>
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

                                            <div className="mx-2">{data.review.length} Reviews</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex lg:flex-col justify-between lg:justify-around items-end">
                                    <div className="font-light"><span className="lg:me-1">Founded on:</span>{data.foundedOn}</div>
                                    <div>
                                        <button className="bg-purple-600 text-white  py-1 px-4 rounded shadow hover:bg-purple-700 transition flex  items-center " onClick={() => setShowModal(true)} ><FaPlus className="mx-1" />Add Review</button>
                                    </div>
                                </div>
                            </div>)
                    }
                    <div className="p-2">
                        {
                            company.map(data =>
                                <div key={data.companyName} className="mt-4">
                                    <p className=" font-light mb-2">Result Found {getReview(data.review)}</p>
                                    {
                                        data.review.length === 0 ? (
                                            <div className="text-gray-500">No reviews yet.</div>
                                        ) : (
                                            data.review.map((review, index) =>
                                                <div key={index} className="border-b py-4">
                                                    <div className="flex justify-between">
                                                        <div>
                                                            <div className="font-bold">{review.name}</div>
                                                            <div className="text-sm text-gray-500">
                                                                {new Date(review.createdAt).toLocaleString()}
                                                            </div>
                                                        </div>
                                                        <div>
                                                            {
                                                                (review.rating == 1) ? <FaStar className={`text-3xl  text-yellow-400`} /> : (review.rating == 2) ? <div className="flex"><FaStar className={`text-3xl  text-yellow-400`} /><FaStar className={`text-3xl  text-yellow-400`} /></div> :
                                                                    (review.rating == 3) ? <div className="flex"> <FaStar className={`text-2xl  text-yellow-400`} /><FaStar className={`text-2xl  text-yellow-400`} /><FaStar className={`text-2xl  text-yellow-400`} /></div> :
                                                                        (review.rating == 4) ? <div className="flex "><FaStar className={`text-2xl  text-yellow-400`} /><FaStar className={`text-2xl  text-yellow-400`} /><FaStar className={`text-2xl  text-yellow-400`} /><FaStar className={`text-2xl  text-amber-300`} /></div> :
                                                                            (review.rating == 4) ? <div className="flex"><FaStar className={`text-2xl  text-yellow-400'`} /><FaStar className={`text-2xl  text-yellow-400`} /><FaStar className={`text-2xl  text-yellow-400`} /><FaStar className={`text-2xl  text-yellow-400`} /></div> : <></>




                                                            }

                                                        </div>


                                                    </div>
                                                    <div className="flex text-yellow-400 mt-1">
                                                        {Array.from({ length: review.rate || 0 }, (_, i) => (
                                                            <FaStar key={i} />
                                                        ))}
                                                    </div>
                                                    <div className="text-gray-700">{review.reviewtext} </div>
                                                </div>
                                            )
                                        )
                                    }
                                </div>
                            )
                        }
                    </div>

                </div>


            </div >

            {showModal && (
                <div className="fixed inset-0 z-50 bg-black/50 flex  justify-center px-2 lg:px-0  ">
                    <div className="bg-white rounded-lg shadow-lg  max-w-md p-6 h-142 mt-24 relative">

                        <button
                            className="absolute top-4 right-4 text-2xl cursor-grab"
                            onClick={() => setShowModal(false)}
                        >
                            &times;
                        </button>
                        <img src="../../public/group.png" alt="" width="100px" height="100px" className="absolute top-0 -left-0" />

                        <h2 className="text-2xl font-semibold text-center mb-6 z-10 relative">Add Review</h2>


                        <form className="space-y-4 h-120 overflow-auto" onSubmit={formik.handleSubmit}>
                            <div>
                                <label className="text-sm font-medium">Full Name</label>
                                <input
                                    type="text"
                                    placeholder="Enter..."
                                    className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
                                    name="name" onChange={formik.handleChange}
                                />
                                <div className="font-semibold" style={{ color: 'red' }}>{formik.errors.name}</div>


                            </div>

                            <div>
                                <label className="text-sm font-medium">Subject</label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        placeholder="Subject"
                                        className="w-full mt-1 px-4 py-2 border rounded-lg pr-10 focus:outline-none focus:ring-2 focus:ring-purple-400"
                                        name="reviewsubject"
                                        onChange={formik.handleChange}
                                    />
                                    <div className="font-semibold" style={{ color: 'red' }}>{formik.errors.reviewsubject}</div>


                                </div>
                            </div>




                            <div>
                                <label className="text-sm font-medium">Enter your Review</label>
                                <textarea

                                    className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
                                    name="reviewtext"
                                    placeholder="review..."
                                    onChange={formik.handleChange}
                                />
                                <div className="font-semibold" style={{ color: 'red' }}>{formik.errors.reviewtext}</div>

                            </div>

                            <div>
                                <label className=" font-bold text-2xl">Rating</label>
                                <div>
                                    {
                                        [1, 2, 3, 4, 5].map(star => (
                                            <button className="" key={star} onClick={(e) => { e.preventDefault(), setrating(star) }} >
                                                <FaStar className={`text-3xl ${star <= rating ? 'text-yellow-400' : 'text-gray-300'}`} />
                                            </button>
                                        ))
                                    }

                                </div>

                            </div>

                            <button
                                type="submit"
                                className="w-full py-2 mt-4 rounded-lg bg-gradient-to-r from-purple-600 to-blue-500 text-white font-medium"
                            >
                                Save
                            </button>
                        </form>
                    </div >

                </div >
            )
            }

        </>
    )
}