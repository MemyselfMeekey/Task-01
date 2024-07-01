$(document).ready(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
        $('#header-actions').html(`
            <div class="user-info">
                <a href="userprofile.html"><i class="fa-solid fa-user"></i></a>
                <span>${user.name}</span>
            </div>
        `);
    }

    axios.get('http://localhost:3000/all-users')
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

            $('#userTableBody tr').on('click', function () {
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
            console.log('Data could not be fetched', err);
        });
});
