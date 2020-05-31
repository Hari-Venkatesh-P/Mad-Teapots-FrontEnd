function setGuestLoggedIn(tablename)
{
    sessionStorage.setItem("guest","guest")
    sessionStorage.setItem("tablename",(tablename).toString())
}

function setAdminLoggedIn()
{
    sessionStorage.setItem("admin","admin")
}

function isGuestLoggedIn() {
    return !(sessionStorage.getItem('guest') === null && sessionStorage.getItem('tablename') === null)
}

function isAdminLoggedIn() {
    return !(sessionStorage.getItem('admin') === null)
}

function setCookLoggedIn()
{
    sessionStorage.setItem("cook","cook")
}

function isCookLoggedIn() {
    return !(sessionStorage.getItem('cook') === null)
}

module.exports = {
    setGuestLoggedIn,
    setAdminLoggedIn,
    isGuestLoggedIn,
    isAdminLoggedIn,
    setCookLoggedIn,
    isCookLoggedIn   
}