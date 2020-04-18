/**
 * ScrapProduct Service
 */
const puppeteer = require('puppeteer')
const helper = require('../common/helper')
/**
 * Scrap Product Fucntion
 * @param {String} ProductName 
 * @return {Promise} Product
 */
const scrapProduct = async (ProductId)=>{

         // Open a headless browser
        const browser = await puppeteer.launch({})
        // Open new page
        const page = await browser.newPage()

        //Go to the Product Page
        await page.goto(helper.generateAliExpressUrl(ProductId),{waitUntil:'load',timeout:0})
   
        
        const result = await page.evaluate(()=>{
            let data = {};
            let sku = []
           let attribute = []
            // get skut
            keys = document.querySelectorAll('.sku-property')
            //Convert noder To array
            const SKU_PROPERTY = Array.from(keys)
                        
        /**
         * extract sku of a product
         * @param {Array} arr sku Arrays
         * @param {Integer} i index
         */
        const generateskus = function (arr,i){
                                    
            if(i > arr.length-1){
                // get the sku price
                let _price = document.querySelector('.product-price-value').innerText;
                // get sku titles
                const titles = document.querySelectorAll('.sku-title')
                
                //iterate over titles and extract all sku titles
                titles.forEach((title)=>{
                    attribute.push(title.innerText)
                })
        
                const items = document.querySelectorAll('li.selected')
                // sku images
                items.forEach((title)=>{
                    img = title.querySelector('.sku-property-image img')
                    if(!!img)attribute.push(img.src)
                })
                attribute.push(_price)
                sku.push(attribute)
                attribute = []
                return
            }
            const text = arr[i].querySelectorAll('.sku-property-text')
            const images = arr[i].querySelectorAll('.sku-property-image')
        
            if(text.length>0){
                text.forEach((e,j)=>{
                    e.click()
                    generateskus(arr,i+1)
                })
            }
            else if(images.length>0){
                images.forEach((e,j)=>{
                    e.click()
                    generateskus(arr,i+1)
                })
            }
        
        }

               try {
                generateskus(SKU_PROPERTY,0)
                    let image_List = []
                    const  images = document.querySelectorAll('.images-view-list li')
                    images.forEach((img)=>{
                        item = img.querySelector('img').src.split('_')[0]
                        image_List.push(item)
                    })
                    title = document.querySelector('.product-title').innerHTML;
                    description = document.querySelector('.product-detail').innerHTML

                    data =  {title,sku,image_List,description}
                    
                }
                catch (exception){
                    throw new Error(exception)
                }

                return data
        })
        await browser.close
    
        return result
}


module.exports = {
    scrapProduct
}