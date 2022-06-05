import order from "../../../db/model/order"

const orderTableBody = document.querySelector('#orderTableBody')

order.find({ status: { $ne: 'completed' } }, null, { sort: { 'createdAt': -1 }}).populate('customerId', '-password').exec((err, orders) => {
    orders.map(order => {
        console.log()
        console.log(order.user.name)
        console.log(order.user.address)
        console.log(order.user.number)
        console.log(order.createdAt)
        let items = order.items
        let parsedItems = Object.values(items)
         parsedItems.map((menuItem) => {
             console.log(menuItem.item.name)
             console.log(menuItem.qty)
         })
        console.log('-----------------------------------------------------------')

        orderTableBody.innerHTML = `
        <tr> 
          <td> ${ data.id } </td>
          <td> ${ data.name } </td>
          <td> ${ data.address } </td>
          <td> ${ data.phone } </td>
          <td> ${ data.time } </td>
        </tr>`

    }).join('')})