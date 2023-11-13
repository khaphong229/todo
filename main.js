const inputId=document.getElementById("idInput")
const inputAdd=document.getElementById("addWork")
const inputMode=document.getElementById("addMode")
const inputStatus=document.querySelectorAll('input[type="radio"][name="mode"]')

listwork=[]

const handleSubmit=()=>{
    let status=""
    inputStatus.forEach((item)=>{
        if(item.checked){
            status=item.value;
        }
    })
    let in4todo={
        id:Date.now(),
        work:inputAdd.value,
        mode:inputMode.value,
        status:status,
    }

    if(inputId.value){
        listwork=listwork.map((item)=>{
            if(item.id=== +inputId.value){
                return {
                    ...in4todo,
                    id:item.id,
                }
            }else{
                return in4todo
            }
        })
        document.getElementById("submit").innerText = "Add";
    }else{
        listwork=[...listwork,in4todo];
    }
    display(listwork)
    reset()
}

const display=(arrData)=>{
    let data=arrData.map((item)=>{
        return `
        <tr>
        <td>${item.work}</td>
        <td>${item.status}</td>
        <td>
            <button onclick="handleEdit(${item.id})">sửa</button>
            <button onclick="handleDelete(${item.id})">xóa</button>
        </td>
        </tr>
        `
    })
    document.getElementById("tbody").innerHTML=data.join("");
}
const reset=()=>{
    inputAdd.value="";
    inputMode.value="";
    inputStatus.forEach((item)=>{
        item.checked=false;
    })
}

const handleDelete=(sv)=>{
    listwork=listwork.filter((item)=>{
        return item.id !== sv
    })

    listwork=[...listwork]

    display(listwork)

}

const handleEdit=(code)=>{

    const worksua=listwork.find((item)=>{
        return item.id===code
    })

    const { id,work,mode,status }=worksua;
    console.log(worksua);
    inputId.value=id;
    inputAdd.value=work;
    if (code) {
        document.getElementById("submit").innerText = "Edit";
      }
}