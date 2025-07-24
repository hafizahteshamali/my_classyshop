import { LiaShippingFastSolid } from "react-icons/lia";
import { products } from "../../../assets/ConstantData";

const Shipping = ({notShipping}) => {
  return (
    <div className="container mx-auto flex flex-col justify-center items-center">
      {!notShipping ? (
        <div className="w-[80%] min-h-[100px] border-3 mb-[50px] border-[#ff5252] rounded-md flex flex-col gap-5 md:flex-row md:justify-around md:gap-0 items-center">
            <div className="flex justify-center items-center gap-4">
            <LiaShippingFastSolid className="text-4xl" />
                <span className="text-2xl">Free Shipping</span>
            </div>
            <div className="text-center md:text-left">
                <p>Free Delivery Now On Your First Order and over $200</p>
            </div>
            <div>
                <span>- Only $200*</span>
            </div>
        </div>
      ) : null}


      <div className="flex flex-col gap-5 justify-between mb-[50px] lg:flex-row lg:gap-3 mt-5 items-center">
        {products.map((product) => (
          <div
            key={product.id}
            className={`rounded-lg ${product.bgColor} flex flex-col h-[250px] w-[100%] p-2 transition-transform hover:shadow-lg hover:-translate-y-1`}
          >
            <div className="flex h-full justify-center gap-2 items-center">

            <div className="w-[50%] h-[70%] flex justify-center items-center">
                <img
                  src={product.image || "/placeholder.svg"}
                  alt={product.title}
                  className="h-[150px] w-[130px] object-contain"
                />
              </div>

              <div className="w-[50%]">
                <h3 className={`font-medium ${product.textColor} text-lg`}>{product.title}</h3>
                <p className={`font-bold text-2xl ${product.textColor}`}>{product.price}</p>
                <a
                  href="#"
                  className="uppercase text-gray-700 hover:text-gray-900 font-medium text-sm flex items-center gap-1"
                >
                  Shop Now
                </a>
              </div>

              
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Shipping