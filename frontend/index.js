$(document).ready(() => {
    axios.get('http://localhost:3000/getAll')
        .then(res => {
            const users = res.data.result;
            let serialNumber = 1;

            const tableBody = users.map(user => `
                <tr data-email="${user.email}" data-name="${user.name}" data-phone="${user.phone}">
                    <td>${serialNumber++}</td>
                    <td>${user.name}</td>
                    <td>${user.email}</td>
                    <td>${user.phone}</td>
                </tr>
            `).join('');

            $('#userTableBody').html(tableBody);


            $('#userTableBody tr').on('click', function(e) {
            
                const userName = $(this).data('name');
                const userEmail = $(this).data('email');
                const userPhone = $(this).data('phone');

                $('#userName').text(userName);
                $('#userEmail').text(userEmail);
                $('#userPhone').text(userPhone);

                $('#userModal').modal('show');
            });
        })
        .catch(err => {
            console.log('Data couldnot be fetched', err);
        });
});
