jQuery(function($){
    let State = {
        colour: {
            1: 'bg-label-success',
            0: 'bg-label-danger'
        },
        name: {
            1: "Active",
            0: "Inactive"
        }
    }

    let KAR = {}

    KAR.actived = function() {
        KAR.API.List()
        KAR.EVENT.active()
    }

    KAR.API = {
        List: function(){
            $.ajax({
                url: APIURL + '/admin/user_list',
                headers: {
                    'x-api-key': token_login
                },
                success: function(resp){
                    $('#list-karyawan tbody').empty()
                    $.each(resp.data, function(key, val){
                        $.ajax({
                            url: APIURL + '/admin/detail_divisi?id='+val.divisi_id,
                            // method: 'GET',
                            headers: {
                                'x-api-key': token_login
                            },
                            // data: {
                            //     id: val.divisi_id
                            // },
                            success:function(respon){


                                $('#list-karyawan tbody').append(
                                    `<tr>
                                        <td>${val.fullname}</td>
                                        <td>${val.address}</td>
                                        <td>${respon.data.name}</td>
                                        <td><span class="badge ${State.colour[val.is_active]} me-1">${State.name[val.is_active]}</span></td>
                                        <td>
                                            <a href="javascript:void(0);" class="mr-2 detail" id="editKar" title="EditKar" data-id="${val.id}" data-name="${val.fullname}" data-password="${val.password}" data-email="${val.email}" data-phone="${val.phone}" data-address="${val.address}" style="color: #71dd37;"><i class="fa-solid fa-pen-to-square"></i></a>
                                            <a href="javascript:void(0);" class="mr-2 detail" id="deleteKar" title="DeleteKar" data-id="${val.id}" style="color: #ff3e1d;"><i class="fa-solid fa-circle-xmark"></i></a>
                                        </td>
                                    </tr>`
                                )
                            }

                        })
                    })
                }
            })
        },
        AddKar: function(name,email,pass,repass,phone,address, divisi){
            $.ajax({
                url: APIURL + '/admin/user_register',
                method: 'POST',
                headers: {
                    'x-api-key': token_login
                },
                data: {
                    fullname: name,
                    email: email,
                    password: pass,
                    re_password: repass,
                    phone: phone,
                    address: address,
                    divisi_id: divisi
                },
                success: function(resp){
                    $('#modalDivisi').modal('hide')
                    if(resp.meta.code == 201){
                        $('.toast-header').addClass('bg-success')
                        $('#toast-title-message').html(resp.meta.status.toUpperCase())
                        $('.toast-body').html(resp.meta.message)
                        $('#liveToast').toast('show')
                    } else {
                        console.log('tes: ', resp.meta.code);
                        console.log('tes: ', resp.meta.message);
                        console.log('tes: ', resp.meta.status);
                        $('.toast-header').addClass('bg-warning')
                        $('#toast-title-message').html('Failed')
                        $('.toast-body').html('Fail to add data')
                        $('#liveToast').toast('show')
                    }
                    KAR.API.List()
                },
                error: function(e) {
                    console.log('error: ', e);
                }
            })
        },
        Deletekar: function(id){
            console.log(id)
            $.ajax({
                url: APIURL + '/admin/delete_user',
                method: 'DELETE',
                headers: {
                    'x-api-key': token_login
                },
                data: {
                    id: id,
                },
                success: function(resp){
                    $('#modalConfirm').modal('hide')
                    if(resp.meta.code == 200){
                        $('.toast-header').addClass('bg-success')
                        $('#toast-title-message').html(resp.meta.status.toUpperCase())
                        $('.toast-body').html(resp.meta.message)
                        $('#liveToast').toast('show')
                    } else {
                        $('.toast-header').addClass('bg-warning')
                        $('#toast-title-message').html('Failed')
                        $('.toast-body').html('Fail to delete data')
                        $('#liveToast').toast('show')
                    }
                    KAR.API.List()
                },
                error: function(e) {
                    console.log('error: ', e);
                }
            })
        },
        Editkar: function(id, name, email, pass, phone, address, div, status){
            console.log(id)
            console.log(name)
            $.ajax({
                url: APIURL + '/admin/edit_user',
                method: 'PUT',
                headers: {
                    'x-api-key': token_login
                },
                data: {
                    id: id,
                    fullname: name,
                    password: pass,
                    email: email,
                    phone: phone,
                    address: address,
                    divisi_id: div,
                    is_active: status
                },
                success: function(resp){
                    $('#modalDivisi').modal('hide')
                    if(resp.meta.code == 200){
                        $('.toast-header').addClass('bg-success')
                        $('#toast-title-message').html(resp.meta.status.toUpperCase())
                        $('.toast-body').html(resp.meta.message)
                        $('#liveToast').toast('show')
                    } else {
                        $('.toast-header').addClass('bg-warning')
                        $('#toast-title-message').html('Failed')
                        $('.toast-body').html('Fail to edit data')
                        $('#liveToast').toast('show')
                    }
                    KAR.API.List()
                },
                error: function(e) {
                    console.log('error: ', e);
                }
            })
        }
    }

    KAR.EVENT = {
        active: function(){
            this.addkar()
            this.deletekar()
            this.editkar()
        },
        addkar: function(){
            $('#btnAddKar').on('click', function(e){
                $('.save-action-edit').attr('id', 'addData')
                $('#nama-karyawan').val('')
                $('#email-karyawan').val('')
                $('#pass-karyawan').val('')
                $('#repass-karyawan').val('')
                $('#phone-karyawan').val('')
                $('#address-karyawan').val('')
                $('#status-kar').css('display', 'none')
                $('#divSelect').empty()
                $.ajax({
                    url: APIURL + '/admin/list_divisi',
                    headers: {
                        'x-api-key': token_login
                    },
                    success: function(resp){
                        $.each(resp.data, function(key, val){
                            if(val.is_active == 1){
                                $('#divSelect').append(
                                    `<option value="${val.id}">${val.name}</option>`
                                )
                            }
                        })
                    }
                })
                $('#modalDivisi').modal('show')
            })
            $(document).on('click','#addData', function(e) {
                KAR.API.AddKar($('#nama-karyawan').val(),$('#email-karyawan').val(),$('#pass-karyawan').val(),$('#repass-karyawan').val(),$('#phone-karyawan').val(),$('#address-karyawan').val(),$('#divSelect').val())
            })
        },
        deletekar: function(){
            $('#list-karyawan tbody').on('click', '#deleteKar', function() {
                $('#idx').val($(this).data('id'))
                $('#reason').css('display', 'none')
                $('.save-action').attr('id', 'deleteData')
                $('#modalConfirm').modal('show')
            })

            $(document).on('click', '#deleteData', function() {
                if ($('#confirm-action').is(':checked')) {
                    $('#ck-label').css('color', '')

                    console.log($('#idx').val())
                    // return console.log(params);
                    KAR.API.Deletekar($('#idx').val())
                } else {
                    $('#ck-label').css('color', 'red')
                }
            })
        },
        editkar: function() {
            let idx = ''
            let name = ''
            let email = ''
            let pass = ''
            let phone = ''
            let address = ''
            $('#list-karyawan tbody').on('click', '#editKar', function() {
                idx = $(this).data('id')
                name = $(this).data('name')
                email = $(this).data('email')
                pass = $(this).data('password')
                phone = $(this).data('phone')
                address = $(this).data('address')
                $('#nama-karyawan').val(name)
                $('#email-karyawan').val(email)
                $('#pass-karyawan').val('')
                $('#repass').css('display', 'none')
                $('#status-kar').css('display', '')
                // $('#repass-karyawan').val('')
                $('#phone-karyawan').val(phone)
                $('#address-karyawan').val(address)
                $('.save-action-edit').attr('id', 'editData')
                $('#divSelect').empty()
                $.ajax({
                    url: APIURL + '/admin/list_divisi',
                    headers: {
                        'x-api-key': token_login
                    },
                    success: function(resp){
                        $.each(resp.data, function(key, val){
                            if(val.is_active == 1){
                                $('#divSelect').append(
                                    `<option value="${val.id}">${val.name}</option>`
                                )
                            }
                        })
                    }
                })
                $('#modalDivisi').modal('show')
            })

            $(document).on('click', '#editData', function() {
                // if ($('#confirm-action').is(':checked')) {
                //     $('#ck-label').css('color', '')

                    console.log(idx)
                    console.log(name)
                    // return console.log(params);
                    KAR.API.Editkar(idx,$('#nama-karyawan').val(),$('#email-karyawan').val(),$('#pass-karyawan').val(),$('#phone-karyawan').val(),$('#address-karyawan').val(),$('#divSelect').val(),$('#statusSelect').val())
                // } else {
                //     $('#ck-label').css('color', 'red')
                // }
            })
        },
    }

    KAR.actived()
})
