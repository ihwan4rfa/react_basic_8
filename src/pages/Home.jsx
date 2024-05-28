import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../component/Navbar";
import '../style.css'

const Home = () => {

    const [datas, setDatas] = useState([])

    const getData = () => {
        axios
            .get(`https://api.mudoapi.tech/menus?perPage=100`)
            .then((res) => {
                console.log(res);
                const response = res?.data?.data?.Data;
                console.log(response);
                setDatas(response);
            })
            .catch((err) => console.log(err));
    }

    useEffect(() => {
        getData();
    }, [])

    return (
        <div>
            <Navbar />
            {datas.map((item) => (
                <Link to={`/menu/${item?.id}`} className="layout">
                    <img src={item?.imageUrl} alt="" />
                    <div className="text-layout">
                        <h1>{item?.name}</h1>
                        <h3>{`Harga: ${item?.price}.000`}</h3>
                    </div>
                </Link>
            ))}
        </div>
    )
}

export default Home