function savetoLocal(event) {
    event.preventDefault();
    const amount = event.target.amount.value;
    const detail = event.target.desc.value;
    const category = event.target.myCat.value;

    const obj = {
        amount,
        detail,
        category
    }
    axios.post("https://crudcrud.com/api/213c67e4372b454a85762a7f06aa7fb1/WalletPassbookData", obj).then(response => {
        console.log(response.data);
        showMeUser(response.data);
    })
        .catch((err) => {
            console.log(err)
        })

}

window.addEventListener("DOMContentLoaded", () => {
    axios.get("https://crudcrud.com/api/213c67e4372b454a85762a7f06aa7fb1/WalletPassbookData").then((response) => {
        console.log(response);
        for (var i = 0; i < response.data.length; i++) {
            showMeUser(response.data[i]);
        }
    })
        .catch((err) => {
            console.log(err);
        })
})

function showMeUser(obj) {

    document.getElementById('details').value = '';
    document.getElementById('amount').value = '';
    document.getElementById('category').value = '';
    if (localStorage.getItem(obj.detail) !== null) {
        removeFromScreen(obj.detail);
    }

    const parentNode = document.getElementById('listofUsers');
    const childNode = `<li class="items" id=${obj._id}>₹ ${obj.amount} - ${obj.detail}
        <button onclick="deleteUser('${obj._id}')"> Delete expense </button>
        <button onclick="editUser('${obj.detail}','${obj.amount}','${obj.category},${obj._id}')"> Edit </button>
          </li>`;

    parentNode.innerHTML = parentNode.innerHTML + childNode;
}
function deleteUser(userId) {
    axios.delete(`https://crudcrud.com/api/213c67e4372b454a85762a7f06aa7fb1/WalletPassbookData/${userId}`)
        .then((response) => {
            removeFromScreen(userId);
        }).catch((err) => {
            console.log(err)
        })
    console.log(userId)
    removeFromScreen(userId);
}
function editUser(emai, user, cate, userId) {
    document.getElementById('details').value = emai;
    document.getElementById('amount').value = user;
    document.getElementById('category').value = cate;
    deleteUser(userId);
    removeFromScreen(userId);

}

function removeFromScreen(userId) {
    const parent = document.getElementById('listofUsers');
    const childtobeDeleted = document.getElementById(userId);
    if (childtobeDeleted) {
        parent.removeChild(childtobeDeleted);
    }
}