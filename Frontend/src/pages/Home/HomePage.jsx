import { useEffect, useState } from "react";
import {
  blogsData,
  categoriesData,
  PopularProductCategory,
} from "../../assets/ConstantData";
import HomeCat from "../../components/HomeCat";
import HeroBanner from "./elements/HeroBanner";
import { Tab, Tabs } from "@mui/material";
import ProductSlider from "../../components/ProductSlider";
import { useDispatch, useSelector } from 'react-redux';
import { getReq } from "../../api/axios";
import { getProductData } from "../../store/Reducers";
import Banner from "./elements/Banner";
import Shipping from "./elements/Shipping";
import BlogCard from "../../components/BlogCard";
import Modal from "../../components/Modal";

const HomePage = () => {
  // Find the index of "fashion" in PopularProductCategory
  const defaultTabIndex = PopularProductCategory.findIndex(
    item => item.text.toLowerCase() === "fashion"
  );

  // Set initial value to the fashion tab index (or 0 if not found)
  const [value, setValue] = useState(defaultTabIndex !== -1 ? defaultTabIndex : 0);
  const [categoryData, setCategoryData] = useState([]);
  const [allProduct, setAllProduct] = useState([]);
  const [allFeaturePro, setallFeaturePro] = useState([])
  const [allWellnessPro, setAllWellnessPro] = useState([])
  const [allElectronicPro, setAllElectronicPro] = useState([])
  const [allBagsPro, setAllBagsPro] = useState([])
  const [allBeautyPro, setAllBeautyPro] = useState([])
  const [isModal, setIsModal] = useState(false);
  const [singleProductId, setSingleProductId] = useState(null)

  console.log(isModal, singleProductId)

  const dispatch = useDispatch();
  const data = useSelector((state) => state.ProductReducer.products);

  const getAllProduct = async () => {
    try {
      const response = await getReq('/products');
      dispatch(getProductData(response.data));
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getAllProduct();
  }, []);

  // Update allProduct when data changes
  useEffect(() => {
    if (data?.products) {
      setAllProduct(data.products);
    }
  }, [data]);

  // Filter products by category whenever allProduct changes
  useEffect(() => {
    if (allProduct && allProduct.length > 0) {
      // Get the selected category text from the current tab value
      const selectedLabel = PopularProductCategory[value]?.text.toLowerCase();
      const filteredProducts = allProduct.filter(
        (item) => item.category.toLowerCase() === selectedLabel
      );
      setCategoryData(filteredProducts);
    }
  }, [allProduct, value]);

  const handleChange = (event, newValue) => {
    // Just update the tab value - the useEffect above will handle filtering
    setValue(newValue);
  };

  useEffect(() => {
    const featurePro = allProduct.filter((prod) =>
      ["fashion", "bags", "electronics"].includes(prod.category.toLowerCase())
    );
    setallFeaturePro(featurePro);
  }, [allProduct]);

  useEffect(() => {
    const wellnessPro = allProduct.filter((pro) => pro.category == "wellness")
    setAllWellnessPro(wellnessPro)
  }, [allProduct])

  useEffect(() => {
    const electronicsPro = allProduct.filter((pro) => pro.category == 'electronics')
    setAllElectronicPro(electronicsPro)
  }, [allProduct])

  useEffect(() => {
    const bagsPro = allProduct.filter((pro) => pro.category == 'bags')
    setAllBagsPro(bagsPro)
  }, [allProduct])

  useEffect(() => {
    const beautyPro = allProduct.filter((pro) => pro.category == 'beauty')
    setAllBeautyPro(beautyPro)
  }, [allProduct])

  return (
    <>
      <HeroBanner />
      <HomeCat categoriesData={categoriesData} />

      <section className="bg-white py-8">
        <div className="container mx-auto">
          <div className="flex flex-col justify-between md:flex-row my-5 p-3">
            <div className="w-[100%] md:w-[40]">
              <h1 className="text-[22px] font-[600]">Popular Products</h1>
              <p className="text-[14px] font-[400] text-gray-500">
                Do not miss the current offers until the end of March.
              </p>
            </div>
            <div className="w-[100%] md:w-[50%]">
              <Tabs
                value={value}
                onChange={handleChange}
                variant="scrollable"
                scrollButtons="auto"
                aria-label="scrollable auto tabs example"
              >
                {PopularProductCategory.map((item, index) => (
                  <Tab
                    key={index}
                    label={item.text}
                    sx={{
                      color: "gray",
                      fontSize: "16px",
                      fontWeight: "500",
                      textTransform: "none",
                    }}
                  />
                ))}
              </Tabs>
            </div>
          </div>

          {categoryData && categoryData.length > 0 ? (
            <ProductSlider item={5} Productdata={categoryData} setIsModal={setIsModal} setSingleProductId={setSingleProductId} />
          ) : (
            <p className="text-center py-4">No products found in this category</p>
          )}
        </div>
      </section>

      <section className="bg-white py-8">
        <div className="container mx-auto">
          <Banner />
          <Shipping />

          <ProductSlider item={5} Productdata={allProduct} latestProd="Latest Products" setIsModal={setIsModal} setSingleProductId={setSingleProductId} />
          <ProductSlider item={5} Productdata={allFeaturePro} latestProd="Feature Products" setIsModal={setIsModal} setSingleProductId={setSingleProductId} />

          <Shipping notShipping />
          <ProductSlider item={5} Productdata={allWellnessPro} latestProd="Wellness Products" setIsModal={setIsModal} setSingleProductId={setSingleProductId} />
          <ProductSlider item={5} Productdata={allElectronicPro} latestProd="Electronics Products" setIsModal={setIsModal} setSingleProductId={setSingleProductId} />
          <ProductSlider item={5} Productdata={allBagsPro} latestProd="Bags Products" setIsModal={setIsModal} setSingleProductId={setSingleProductId} />
          <ProductSlider item={5} Productdata={allBeautyPro} latestProd="Beauty Products" setIsModal={setIsModal} setSingleProductId={setSingleProductId} />

        </div>
      </section>

      <section className="bg-white py-8">
        <div className="container mx-auto">
          <div className="flex flex-wrap justify-between items-center">
            {blogsData.map((item, index) => (
              <BlogCard key={index} data={item} />
            ))}
          </div>
        </div>
      </section>
      
      {isModal && <Modal setIsModal={setIsModal} singleProductId={singleProductId} />}
      
    </>
  );
};

export default HomePage;