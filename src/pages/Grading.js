



//https://script.google.com/macros/s/AKfycbzoeh6Q_Pcq8cCBcsE-XETDuRHVxoYRO4OQc7LiODgiN9kAcjV_CczmdmZU-ZaMUOwQcA/exec

const GradingPage = () => {
     
    const handleSubmit = (e) =>  {
        e.preventDefault()
        const url ='https://script.google.com/macros/s/AKfycbzoeh6Q_Pcq8cCBcsE-XETDuRHVxoYRO4OQc7LiODgiN9kAcjV_CczmdmZU-ZaMUOwQcA/exec'
        fetch(url, {
            method:"POST",
            headers: {"Content-Type": "application/x-www-form-urlencoded"},
            body:(`Name=${e.target.name.value}&Email=${e.target.email.value}`)

        }).then(res=>res.text()).then(data=>{
            alert(data)
        }).catch(error=>console.log(error))
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input name ='name' placeholder='Name'></input> <br/>
                <input name='email' placeholder='Email'></input> <br/>
                <button>Add</button>
            </form>
        </div>
    );
};

export default GradingPage;
