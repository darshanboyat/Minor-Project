// Remove alert message after 2 seconds
const alertMsg = document.querySelector('.alert')
if(alertMsg) {
    setTimeout(() => {
        alertMsg.remove()
    }, 2000)
}
