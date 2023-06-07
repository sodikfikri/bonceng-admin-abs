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

    let DIV = {}

    DIV.actived = function() {
        DIV.API.List()
        DIV.EVENT.active()
    }

    DIV.API = {
        List: function(){
            $('#list-div').dataTable().fnDestroy()
            $('#list-div').DataTable()
            $.ajax({
                url: APIURL + '/admin/list_divisi',
                headers: {
                    'x-api-key': token_login
                },
                success: function(resp){
                    $('#list-div tbody').empty()
                    if (resp.meta.code == 200) {
                        $.each(resp.data, function(key, val){
                            let createdAt = `-`
                            let updateAt = `-`
                            if(val.created_at != null){
                                createdAt = `${val.created_at}`
                            }
                            if(val.updated_at != null){
                                updateAt = `${val.updated_at}`
                            }

                            $('#list-div tbody').append(
                                `<tr>
                                    <td>${val.name}</td>
                                    <td>${createdAt}</td>
                                    <td>${updateAt}</td>
                                    <td><span class="badge ${State.colour[val.is_active]} me-1">${State.name[val.is_active]}</span></td>
                                    <td>
                                        <a href="javascript:void(0);" class="mr-2 detail" id="editDiv" title="EditDiv" data-id="${val.id}" data-name="${val.name}" style="color: #71dd37;"><i class="fa-solid fa-pen-to-square"></i></a>
                                        <a href="javascript:void(0);" class="mr-2 detail" id="deleteDiv" title="DeleteDiv" data-id="${val.id}" style="color: #ff3e1d;"><i class="fa-solid fa-circle-xmark"></i></a>
                                    </td>
                                </tr>`
                            )
                        })
                    }
                }
            })
        },
        AddDivisi: function(name, status){
            $.ajax({
                url: APIURL + '/admin/create_divisi',
                method: 'POST',
                headers: {
                    'x-api-key': token_login
                },
                data: {
                    name: name,
                    is_active: status
                },
                success: function(resp){
                    $('#modalDivisi').modal('hide')
                    if(resp.meta.code == 201){
                        $('.toast-header').addClass('bg-success')
                        $('#toast-title-message').html(resp.meta.status.toUpperCase())
                        $('.toast-body').html(resp.meta.message)
                        $('#liveToast').toast('show')
                    } else {
                        $('.toast-header').addClass('bg-warning')
                        $('#toast-title-message').html('Failed')
                        $('.toast-body').html('Fail to add data')
                        $('#liveToast').toast('show')
                    }
                    DIV.API.List()
                },
                error: function(e) {
                    console.log('error: ', e);
                }
            })
        },
        Deletediv: function(id){
            console.log(id)
            $.ajax({
                url: APIURL + '/admin/delete_divisi',
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
                    DIV.API.List()
                },
                error: function(e) {
                    console.log('error: ', e);
                }
            })
        },
        Editdiv: function(params){
            $.ajax({
                url: APIURL + '/admin/update_divisi',
                method: 'PUT',
                headers: {
                    'x-api-key': token_login
                },
                data: params,
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
                    DIV.API.List()
                },
                error: function(e) {
                    console.log('error: ', e);
                }
            })
        },
        Detail: function(id) {
            $.ajax({
                url: APIURL + '/admin/detail_divisi',
                method: 'GET',
                headers: {
                    'x-api-key': token_login
                },
                data: {
                    id: id
                },
                success: function(resp) {
                    if (resp.meta.code == 200) {
                        $('#idx').val(resp.data.id)
                        $('#nama-divisi').val(resp.data.name)
                        $('#statusSelect').val(resp.data.is_active).change()
                    }
                }
            })
        }
    }

    DIV.EVENT = {
        active: function(){
            this.addDivisi()
            this.deletediv()
            this.editdiv()
        },
        addDivisi: function(){
            $('#btnAddDivisi').on('click', function(e){
                $('.save-action-edit').attr('id', 'addData')
                $('#nama-divisi').val('')
                $('#modalDivisi').modal('show')
            })
            $(document).on('click','#addData', function(e) {
                DIV.API.AddDivisi($('#nama-divisi').val(),$('#statusSelect').val())
            })
        },
        deletediv: function() {
            $('#list-div tbody').on('click', '#deleteDiv', function() {
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
                    DIV.API.Deletediv($('#idx').val())
                } else {
                    $('#ck-label').css('color', 'red')
                }
            })
        },
        editdiv: function() {
            $('#list-div tbody').on('click', '#editDiv', function() {
                DIV.API.Detail($(this).data('id'))
                $('.save-action-edit').attr('id', 'editData')
                $('#modalDivisi').modal('show')
            })

            $(document).on('click', '#editData', function() {

                let params = {
                    id: $('#idx').val(),
                    name: $('#nama-divisi').val(),
                    status: $('#statusSelect').val()
                }
                DIV.API.Editdiv(params)
            })
        },
    }

    DIV.actived()
})
