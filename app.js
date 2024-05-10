// const handleRegistration = (event) => {
//   event.preventDefault();

//   var logindata = {
//     "user_name": "017",
//     "password": "123"
//   };

//   fetch("http://127.0.0.1:8000/user_account/login/", {
//     method: "POST",
//     headers: { "content-type": "application/json" },
//     body: JSON.stringify(logindata),
//   })
//   .then((res) => {
//     console.log('inside res of login');
//     return res.json(); // Explicitly return res.json()
//   })
//   .then(data => {
//     console.log('inside data of login');
//     console.log(data);

//   })
//   .catch((err) => {
//     console.log('inside err login');
//     console.log(err);
//   });
// };

const handleRegistration = (event) => {
  event.preventDefault();
  // Extract form data

  const first_name = document.getElementById("first_name").value;
  const last_name = document.getElementById("last_name").value;
  const birth_day = document.getElementById("birthday").value;
  const mobile_number = document.getElementById("phone").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const confirm_password = document.getElementById("confirm_password").value;
  const gender1 = document.getElementById("gender1").checked; // Boolean value for gender1
  const gender2 = document.getElementById("gender2").checked; // Boolean value for gender2
  const blood_grpup = document.querySelector('[name="subject"]').value;
  var gender = "male";
  if (gender2 == true) {
    gender = "female";
  }

  const info = {
    mobile_number,
    first_name,
    last_name,
    email,
    password,
    confirm_password,
    blood_grpup,
    gender,
  };
  console.log(JSON.stringify(info));

  fetch("https://food-site-03s7.onrender.com/user_account/register/", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(info),
  })
    .then((res) => {
      return res.json(); // Explicitly return res.json()
    })

    .then((data) => {
      console.log("inside data ");
      // console.log(data);
      // console.log(data.status)
      if (data.status == 1) {
        console.log("helllo inside");
        window.location.href = `otp.html?url=${data.activaton_url}`;
      }
    })

    .catch((err) => {
      console.log("inside err ");

      console.log(err);
    });
};

const handlelogOut = (event) => {
  const token = localStorage.getItem("access_token");
  event.preventDefault();
  if (token) {
    localStorage.removeItem("access_token");
  }
  window.location.href = `index.html`;
};

const home_content = () => {
  const parent = document.getElementById("all_content");
  fetch("https://food-site-03s7.onrender.com/post_object/home/", {
    method: "GET",
    headers: { "content-type": "application/json" },
  })
    .then((res) => {
      return res.json(); // Explicitly return res.json()
    })

    .then((data) => {
      console.log(data);
      const all_post = data.all_post;
      data.all_post.forEach((element) => {
        // here element is single post
        const amount = element.amount;
        const apply_availavle = element.apply_availavle;
        const at_leas_5_people_managed = element.at_leas_5_people_managed;
        const blood_grpup = element.blood_grpup;
        const blood_need_time = element.blood_need_time;
        const country = element.country;
        const description = element.description;
        const district = element.district;
        const donate_done = element.donate_done;
        const hospital_name = element.hospital_name;
        const id = element.id;
        const image1 = element.image1;
        const impage2 = element.impage2;
        const post_time = element.post_time;
        const post_update_time = element.post_update_time;
        const title = element.title;
        const unionOrtown = element.unionOrtown;
        const upazila = element.upazila;
        const user_id = element.user_id;
        const villageOrrad = element.villageOrrad;
        const zip_code = element.zip_code;

        console.log(id);
        const div = document.createElement("div");
        div.innerHTML = `
          
          
          <div class="ratio ratio-16x9">
          <img src="${
            "https://food-site-03s7.onrender.com/media/" + image1
          }" class="card-img-top" loading="lazy" alt="...">
      </div>
      <div class="card-body p-3 p-xl-5">
          <h3 class="card-title h5" id="title">${title}</h3>
          <h4 class="card-text" id="time"> time is : ${blood_need_time}</h4>
          <p class="card-text" id="address">address : ${district},${district},${unionOrtown},${villageOrrad}</p>
          </br>
          <a class="btn btn-primary" onclick="post_detials(${id})">details</a>


          <button onclick="document.getElementById('commentForm${id}').style.display='block'"    class="btn btn-primary">Comment</button>

<div id="commentForm${id}" style="display:none;">
    

<form>
    <label for="comment">Comment:</label><br>
    <textarea id="comment${id}" name="comment" rows="4" cols="50" required></textarea><br>
    <button type="button" class="btn btn-primary" onclick="submitComment(${id})">Submit</button>
</form>






</div>

      </div>

          
          `;
        parent.appendChild(div);
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

home_content();

const post_detials = (id) => {
  window.location.href = `postdetials.html?id=${id}`;
};

















function submitComment(id) {
  
  const token = localStorage.getItem("access_token");
  if (!token) {
    window.location.href = `login.html`;
  }
  var discription = document.getElementById(`comment${id}`).value;
  const info = {
    discription,
  };
  console.log(JSON.stringify(info));

  //fetch(`http://127.0.0.1:8000/post_object/coment/?id=${id}`, {
  fetch(`https://food-site-03s7.onrender.com/post_object/coment/?id=${id}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json", // Specify content type
    },
    body: JSON.stringify(info),
  })
    .then((res) => {
      return res.json(); // Explicitly return res.json()
    })
    .then((data) => {
      console.log(data);
    })
    .catch((err) => {
      console.log(err);
    });


    window.location.href=`index.html`;
}




// const coment = (id,text) => {

// alert(id,text)

// }
