import { Check, Cross, Plus, RefreshCwIcon } from "lucide-react"
import { Button } from "./components/ui/button"
import { useState } from "react";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "./components/ui/breadcrumb";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import jsonData from "@/test.json"




function App() {
  const [search, setSearch] = useState('');
  const [addMenu,setAddmenu] = useState(false);
  const [selectedWidget, setSelectedWidget] = useState(1);
  const [arr,setArr] =useState([
    ["true","true","false"],
    ["true","false","false"],
    ["true","false","false"],
    ["false","false","false"],  
    
  ]);

  const currentWidgets =(index: number, ind: number, state: string)=>{
   const newarr  = [...arr]
   newarr[index][ind]=state;

   setArr(newarr);
  }

  return (
    <main className=" p-5 flex flex-col gap-4">
        {/* Navbar */}

        <div className="  flex">
      {/* Breadcrumb */}
      <Breadcrumb className="ml-2 w-[50%]  gap-3 text-lg">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/" className="text-gray-600 text-lg">
              Home
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink
              href="/"
              className="text-blue-600  font-semibold text-lg"
            >
              Dashboard V2
            </BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div  className="flex justify-between w-[50%] pr-10 relative">
        {/* SearchBar */}
        <div className="flex bg-blue-100 px-3 py-[1px] rounded-xl ">
          <input
            onChange={(event)=>setSearch(event.target.value.toLowerCase())}
            placeholder="Search anything..."
            type="text"
            className="bg-blue-100 outline-none"
          />
     
         <div className="absolute top-[60px] bg-blue-100 p-4 rounded-xl">
         {
           search&&(
            jsonData.map((items,index)=>{
              return(
                items.components.filter((ite)=>ite.name.toLowerCase().includes(search)).map((it,j)=>{
                    return(
                      arr[index][j]=="true"&&(
                        <div>{it.name}</div>
                      )
                    )
                })
              )
            })
           )
          }
         </div>

    
        </div>

        {/* Avatar */}
        <div className="flex gap-2 bg-blue-100  pr-4 rounded-2xl py-[1px] items-center justify-center">

        <Avatar className="h-[40px] w-[40px] rounded-full overflow-hidden">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <span className="text-lg font-semibold text-gray-500">Tanishk Dhaka</span>
        </div>
      </div>
        </div>




    <div  className="flex w-full p-2 rounded-xl justify-between items-center bg-blue-100">
     <div className="">
       <h1>CSPM Dashboard</  h1>
     </div>
   <div className="w-[15%] px-4 flex justify-between">
  
      <Button onClick={()=>setAddmenu(true)} className="bg-white rounded-xl flex items-center gap-1" variant={"ghost"}> Add Widget <Plus className="h-[15px] w-[15px]"/></Button>
     
     
     <Button variant={"ghost"} className="bg-white w-[30px] flex items-center py-0 px-1" ><RefreshCwIcon className="rotate-90 w-[15px]"/></Button>
   </div>
    </div>
    

    {/* addWidget menu */}

    {
      addMenu&&(
        <div className="w-[100vw]  h-[100vh] fixed px-2 z-[5] grid grid-cols-2 ">
          <div></div>

          <div className=" bg-white rounded-xl px-4 pr-8  flex flex-col gap-3">
            <div className="bg-blue-950 text-white p-3 rounded-xl flex justify-between pr-10">
              <h1>Add widget</h1>
             < Button onClick={()=>setAddmenu(false)}  variant={"ghost"} className="w-[20px] p-0 h-[20px] bg-red-600 flex items-center rounded-full rotate-45 justify-center "> <Cross className="w-[15px] h-[15px]"/></Button>
            </div>
            <h1 className="p-3">Personalise your Dashboard by adding following widgets</h1>
            <div className="flex p-3 gap-2">
              {jsonData.map((items,index)=>{
                return(
                  selectedWidget==index&&(
                    <button key={index} onClick={()=>setSelectedWidget(index)}  className="flex flex-col ">
                      <h1>{items.category}</h1>
                      <div className=" bg-black  h-[2px] w-full" />
                    </button>
                  )||(
                    <button key={index} onClick={()=>setSelectedWidget(index)}  >
                       <h1>{items.category} </h1>
                       <div className=" bg-gray-300  h-[2px] w-full" />
                    </button>
                  )
                )
              })}
            </div>
            <div className="flex p-3 gap-2 flex-col">

              {jsonData.map((items, index)=>{
                return(

                  selectedWidget==index&&(
                    items.components.map((items,ind)=>(
                      arr[index][ind]=="false"&&(
                        <button className="flex gap-2 items-center" key={ind} onClick={()=>currentWidgets(index,ind,"true")}>
                        <div className="w-[20px] h-[20px] flex items-center justify-center bg-gray-300"/> 
                        {items.name}
                      </button>
                      )||(
                        <button className="flex gap-2 items-center" key={ind} onClick={()=>currentWidgets(index,ind,"false")}>
                        <div className="w-[20px] h-[20px] flex items-center justify-center bg-gray-300"> <Check color="#0d7000" className="w-[15px]  h-[15px]" /> </div>
                        {items.name}
                      </button>
                      )
                    
                    ))
                  )
                    
                  

                )
              })}

            </div>
          </div>
        </div>
      )
    }
  <div className="bg-gray-300 p-3">
     {jsonData.map((items,index)=>(
       <div className="pt-3" key={index}>
       <h1 className="pb-2 font-semibold">{items.category}</h1>
       <div className="grid grid-cols-3 gap-3">
         {items.components.map((cat, i) => {
          return(
            arr[index][i]=="true"&&(
           <div
             key={i}
             className="w-[full] h-[200px] relative rounded-xl bg-white px-3 py-1 gap-4"
           >
             <h1 className="text-xl font-semibold "> {cat.name}</h1>
 
             <p className="text-md pt-2">{cat.text}</p>
 
             <Button onClick={()=>{
              currentWidgets(index,i,"false")
             }} variant={"ghost"} className="w-[20px] p-0 h-[20px] bg-red-600 flex items-center rounded-full rotate-45 top-1 right-1 justify-center absolute z-[1] "> <Cross className="w-[15px] h-[15px]"/></Button>
           </div>
            )
         )})}
         <div className=" flex h-[200px] justify-center border-white border-4 rounded-xl items-center">
           <Button
             onClick={()=>{setAddmenu(true)
            setSelectedWidget(index)
             }}
             className="bg-white rounded-xl flex items-center gap-1"
             variant={"ghost"}
           >
             {" "}
             Add Widget <Plus className="h-[15px] w-[15px]" />
           </Button>
         </div>
       </div>
 
        
 
       
     </div>
     ))}
     </div>

    </main>
  )
}

export default App
