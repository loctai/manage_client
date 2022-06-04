import React, { useState, useEffect, useContext } from "react";

import LoadingContext from "../../context/LoadingContext";
import { getBookTitle } from "../../api/bookTitle";

function Search() {
    const [data, setData] = useState([]);
    const setLoading = useContext(LoadingContext);
    useEffect(() => {
        setLoading(true);
        getBookTitle()
            .then((res) => {
                setData(res.data);
                setLoading(false);
            })
            .catch((err) => {
                setLoading(false);
            });
    }, []);

    const [filter, setFilter] = useState("");
    const searchText = (event) => {
        setFilter(event.target.value);
    };
    let dataSearch = data.filter((item) => {
        return Object.keys(item).some((key) =>
            item[key]
                .toString()
                .toLowerCase()
                .includes(filter.toString().toLowerCase())
        );
    });
    return (
        <section className="py-4 container">
            <div className="row justify-content-center">
                <div className="col-12 mb-5">
                    <div className="mb-3 col-4 mx-auto text-center">
                        <label>Browsing</label>
                        <input
                            type="text"
                            className="from-control"
                            value={filter}
                            onChange={searchText.bind(this)}
                        />
                    </div>
                </div>
                {dataSearch.map((item, index) => {
                    return (
                        <div className="col-11 col-md-6 col-lg-3 mx-0 mb-4">
                            <div className="card p-0 overflow-hidden h-100 shadow">
                                <img src={item.image} className="card-img-top" />
                                <div className="card-body">
                                    <h5 className="card-title">{item.title}</h5>
                                    <p className="card-text"> {item.description}</p>
                                    <button
                                        type="button"
                                        className="btn btn-outline-primary"
                                    /*onClick={() => { }} chờ trang bookDetails để nối vô*/
                                    >
                                        Details
                                    </button>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </section >
    );
}
export default Search;