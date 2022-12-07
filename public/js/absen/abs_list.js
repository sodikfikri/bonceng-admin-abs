jQuery(function($){

    let State = {
        filter: {
            start_date: moment().startOf('month').format('YYYY-MM-DD'),
            end_date: moment().endOf('month').format('YYYY-MM-DD'),
            status: 0
        },
        colour: {
            1: 'text-warning',
            2: 'text-success',
            3: 'text-danger'
        }
    }

    let ABS = {}

    ABS.actived = function() {
        ABS.API.List()
        ABS.EVENT.active()
    }

    ABS.API = {
        List: function() {
            $.ajax({
                url: APIURL + '/admin/presence_list',
                method: 'GET',
                headers: {
                    'x-api-key': token_login
                },
                data: {
                    start_date: State.filter.start_date,
                    end_date: State.filter.end_date,
                    status: State.filter.status
                },
                success: function(resp) {
                    $('#list-abs tbody').empty()
                    if (resp.meta.code == 200) {
                        $.each(resp.data, function(key, val) {
                            let in_date = `-`
                            let out_date = ``

                            if (val.in) {
                                in_date = `${val.in.time} | ${val.in.location}`
                            }
                            if (val.out) {
                                out_date = `${val.out.time} | ${val.out.location}`
                            }
                            $('#list-abs tbody').append(
                                `<tr>
                                    <td>${val.generated_date}</td>
                                    <td>${val.user_name}</td>
                                    <td>${in_date}</td>
                                    <td>${out_date}</td>
                                    <td class="${State.colour[val.status_id]}">${val.status}</td>
                                    <td>${val.reason ? val.reason : '-'}</td>
                                    <td>
                                        <a href="javascript:void(0);" class="mr-2 detail" id="approve" title="Approve" data-id="${val.id}" data-time="${val.generated_date}" style="color: #71dd37;"><i class="fa-solid fa-circle-check"></i></a>
                                        <a href="javascript:void(0);" class="mr-2 detail" id="reject" title="Reject" data-id="${val.id}" data-time="${val.generated_date}" style="color: #ff3e1d;"><i class="fa-solid fa-circle-xmark"></i></a>
                                    </td>
                                </tr>`
                            )
                        })
                    } else {
                        alert(resp.meta.message)
                    }
                },
                complete: function() {
                    $('#list-abs').DataTable()
                },
                error: function(e) {
                    console.log('error: ', e);
                }
            })
        },
        Approve: function(idx, gdate) {
            $.ajax({
                url: APIURL + '/admin/presence/approve',
                method: 'POST',
                headers: {
                    'x-api-key': token_login
                },
                data: {
                    presence_id: idx,
                    generated_date: gdate
                },
                success: function(resp) {
                    $('#modalConfirm').modal('hide')
                    if (resp.meta.code == 200) {

                        //toast
                        $('.toast-header').addClass('bg-success')
                        $('#toast-title-message').html(resp.meta.status.toUpperCase())
                        $('.toast-body').html(resp.meta.message)
                        $('#liveToast').toast('show')
                    } else {
                        $('.toast-header').addClass('bg-warning')
                        $('#toast-title-message').html('Failed')
                        $('.toast-body').html('Fail to approve data')
                        $('#liveToast').toast('show')
                    }
                    ABS.API.List()
                },
                error: function(e) {
                    console.log('error: ', e);
                }
            })
        },
        Reject: function(data) {
            $.ajax({
                url: APIURL + '/admin/presence/reject',
                method: 'POST',
                headers: {
                    'x-api-key': token_login
                },
                data: {
                    presence_id: data.presence_id,
                    generated_date: data.generated_date,
                    reason: data.reason
                },
                success: function(resp) {
                    $('#modalConfirm').modal('hide')
                    if (resp.meta.code == 200) {

                        //toast
                        $('.toast-header').addClass('bg-success')
                        $('#toast-title-message').html(resp.meta.status.toUpperCase())
                        $('.toast-body').html(resp.meta.message)
                        $('#liveToast').toast('show')
                    } else {
                        $('.toast-header').addClass('bg-warning')
                        $('#toast-title-message').html('Failed')
                        $('.toast-body').html('Fail to reject data')
                        $('#liveToast').toast('show')
                    }
                    ABS.API.List()
                },
                error: function(e) {
                    console.log('error: ', e);
                }
            })
        }
    }

    ABS.EVENT = {
        active: function() {
            this.approve()
            this.reject()

            $('input[name="daterange"]').daterangepicker({
                opens: 'right',
                startDate:  `${moment().startOf('month').format('MM-DD-YYYY')}`,
                endDate: `${moment().endOf('month').format('MM-DD-YYYY')}`,
                ranges: {
                    'Today': [moment(), moment()],
                    'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
                    'Last 7 Days': [moment().subtract(6, 'days'), moment()],
                    'Last 30 Days': [moment().subtract(29, 'days'), moment()],
                    'This Month': [moment().startOf('month'), moment().endOf('month')],
                    'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
                 },
                 alwaysShowCalendars: true,
            }, function(start, end, label) {
                State.filter.start_date =  start.format('YYYY-MM-DD')
                State.filter.end_date = end.format('YYYY-MM-DD')
            });

            $(document).on('click', '#btnFilter', function(){
                let status = $('input[name="filter-status"]').map(function(){
                    let val = null
                    if ($(this).is(":checked")) {
                        val = $(this).val()
                    }
                    return val;
                }).get();

                State.filter.status = status.length == 0 ? 0 : status

                ABS.API.List()
            })
        },
        approve: function() {
            $('#list-abs tbody').on('click', '#approve', function() {
                // $('#liveToast').toast('show')
                $('#idx').val($(this).data('id'))
                $('#gdate').val($(this).data('time'))
                $('#reason').css('display', 'none')
                $('.save-action').attr('id', 'approveData')
                $('#modalConfirm').modal('show')
            })

            $(document).on('click', '#approveData', function() {
                if ($('#confirm-action').is(':checked')) {
                    $('#ck-label').css('color', '')
                    ABS.API.Approve($('#idx').val(), $('#gdate').val())
                } else {
                    $('#ck-label').css('color', 'red')
                }
            })
            
        },
        reject: function() {
            $('#list-abs tbody').on('click', '#reject', function() {
                $('#idx').val($(this).data('id'))
                $('#gdate').val($(this).data('time'))
                $('#reason').css('display', '')
                $('.save-action').attr('id', 'rejectData')
                $('#modalConfirm').modal('show')
            })

            $(document).on('click', '#rejectData', function() {
                if ($('#confirm-action').is(':checked')) {
                    $('#ck-label').css('color', '')

                    let params = {
                        presence_id: $('#idx').val(),
                        generated_date: $('#gdate').val(),
                        reason: $('#reason-val').val()
                    }
                    // return console.log(params);
                    ABS.API.Reject(params)
                } else {
                    $('#ck-label').css('color', 'red')
                }
            })
        }
    }

    ABS.actived()
})