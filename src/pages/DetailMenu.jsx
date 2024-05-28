import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "../component/Navbar";
import { useNavigate } from "react-router-dom";

const DetailMenu = () => {
    const param = useParams();
    const [menuDetail, setMenuDetail] = useState({});
    const navigate = useNavigate();

    console.log(param?.id);


    const getMenuDetail = () => {
        axios
            .get(`https://api.mudoapi.tech/menu/${param?.id}`)
            .then((res) => {
                console.log(res);
                const response = res?.data?.data;
                console.log(response);
                setMenuDetail(response);
            })
            .catch((err) => console.log(err));
    }

    const handleDelete = () => {
        try {
            const token = localStorage.getItem("access_token");
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            };
            const res = axios.delete(
                `https://api.mudoapi.tech/menu/${param?.id}`, config
            );
            navigate('/');
        } catch (error) {
            console.log(error.response?.message);
        }
    }

    useEffect(() => {
        getMenuDetail();
    }, [])

    return (
        <div>
            <Navbar />
            <div className="layout-detail">
                <img src={menuDetail?.imageUrl} alt="" />
                <div className="text-layout">
                    <h2>{menuDetail?.name}</h2>
                    <h3>{menuDetail?.description}</h3>
                    <h2>{`Harga: ${menuDetail?.price}.000`}</h2>
                </div>
                <button className="button-delete" onClick={handleDelete}>Delete</button>
            </div>
        </div>
    )
}

export default DetailMenu;