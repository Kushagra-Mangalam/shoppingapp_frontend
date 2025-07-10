import { useEffect ,useState} from "react";
import { Navbar } from "../components/Navbar";

const ProfilePage=()=>{

    const [products , setProducts]=useState([]);

    const getData=async ()=>{
        try{
        const resp= await fetch(`${import.meta.env.VITE_BACKEND_URL}/products` , {
            method:"GET",
        })
        const result=await resp.json();
        console.log("Result-->",result);
        setProducts(result.data.products)
    }catch(err){
        console.log("error while getting products-->",err.message)
    }
    }



    useEffect(()=>{
        getData();
    },[])



    const handleSubmit=async (e)=>{
        try{

        e.preventDefault();
    
            const title=e.target.title.value;
            const price=e.target.price.value;
            const description=e.target.description.value;
            const quantity=e.target.quantity.value;

            const resp=await fetch(`${import.meta.env.VITE_BACKEND_URL}/products`,{
                method:"POST",
                body:JSON.stringify({
                    title:title,
                    price:price,
                    description,
                    quantity,
                }),
                headers:{
                    "content-type":"application/json",
                }
            })
            if(resp.status == '201'){
            alert("Product added");
            getData();
            console.log(resp);
            }
            else{
                const result = await resp.json();
                alert(`invalid data : ${result.message}`)
            }


        }catch(err){
            console.log("cannot create product----->",err.message);
            alert(`cannot create rpodict:${err.message}`);
        }
    }

    return(
        <div>
            <Navbar />

            <div>
                <form onSubmit={handleSubmit} className="mx-auto   flex flex-col gap-5 p-6 bg-blue-200 max-w-150">
                    <div className="flex gap-4">
                        <label>Title:</label>
                        <input name="title" type="text" className="border-1 py-1 px-2 rounded-md justify-between"></input>
                </div>
                    <div className="flex gap-4">
                        <label>Price:</label>
                        <input name="price" type="number" className="border-1 py-1 px-2 rounded-md "></input>
                </div>
                    <div className="flex gap-4">
                        <label>Description:</label>
                        <input name="description" type="text" className="border-1 py-1 px-2 rounded-md "></input>
                </div>
                    <div className="flex gap-4">
                        <label>Quantity:</label>
                        <input name="quantity" type="number" className="border-1 py-1 px-2 rounded-md "></input>
                </div>
                <button className="border-1 py-1 px-2 rounded-md">Add product</button>
                </form>
            </div>


            <div className="flex flex-wrap gap-6 justify-center">
                {products.map((product) => (
                    <div
                        key={product._id}
                        className="bg-gradient-to-r from-emerald-400 to-amber-700 shadow-md rounded-lg p-6 w-64 flex flex-col items-center transition-transform hover:scale-105"
                    >
                        <div className="text-lg font-semibold mb-2">{product.title}</div>
                        <div className="text-gray-700 mb-4">Rs.{product.price}</div>
                        <div className="text-gray-700 mb-4">{product.description}</div>
                        {/* Add more product details here if needed */}
                    </div>
                ))}
            </div>
        </div>
    )
}

export {ProfilePage};