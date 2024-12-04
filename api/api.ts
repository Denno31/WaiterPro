

const baseUrl = 'http://192.168.0.102:3000'

export const fetchBills = async()=>{
    try {
        const response = await fetch(`${baseUrl}/api/bills`)
        const jsonData = await response.json()
        return jsonData
    } catch (error) {
        console.error(error)
    }
}