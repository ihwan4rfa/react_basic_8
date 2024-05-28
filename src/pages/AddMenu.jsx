import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useState } from 'react';

const AddMenu = () => {
    const [form, setForm] = useState({
        name: "",
        description: "",
        type: "",
        imageUrl: "",
        price: ""
    });

    const navigate = useNavigate();

    const handleChange = (event) => {
        setForm({
            ...form,
            [event.target.name]: event.target.value
        })
    }

    const handleSubmit = async () => {
        const payLoad = {
            name: form?.name,
            description: form?.description,
            type: form?.type,
            imageUrl: form?.imageUrl,
            price: parseInt(form?.price)
        }

        console.log(payLoad);

        try {
            const token = localStorage.getItem("access_token");
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            };

            const response = axios.post(
                "https://api.mudoapi.tech/menu",
                payLoad, config
            )
            navigate("/")
        } catch (error) {
            console.log(error.response);
        }
    }

    return (
        <div className='layout-addmenu'>
            <div className='add-menu'>Tambahkan Menu Baru</div>

            <input className='form-style' placeholder='nama' name='name' onChange={handleChange} />
            <input className='form-style' placeholder='deskripsi' name='description' onChange={handleChange} />
            <input className='form-style' placeholder='tipe' name='type' onChange={handleChange} />
            <input className='form-style' placeholder='image Url' name='imageUrl' onChange={handleChange} />
            <input className='form-style' placeholder='harga' name='price' onChange={handleChange} />

            <button onClick={handleSubmit}>Tambah</button>
        </div>
    )
}

export default AddMenu;