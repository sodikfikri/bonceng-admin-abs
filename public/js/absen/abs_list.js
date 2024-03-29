jQuery(function($){

    let State = {
        table: '',
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
                    if (resp.meta.code == 200) {
                        $('#list-abs tbody').empty()
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

                    $('#list-abs').dataTable().fnDestroy()
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

                    $('#list-abs').dataTable().fnDestroy()
                    ABS.API.List()
                },
                error: function(e) {
                    console.log('error: ', e);
                }
            })
        },
        Rekap: function(data) {
            $.ajax({
                url: APIURL + '/admin/abs/recap',
                method: 'GET',
                headers: {
                    'x-api-key': token_login
                },
                data: {
                    start_date: data.start_date,
                    end_date: data. end_date
                },
                success: function(resp) {
                    if (resp.meta.code == 200) {
                        let years = moment(data.start_date).format('YYYY')
                        let month = moment(data.start_date).format('MM')
                        let header = ABS.FUNCTION.getDaysArray(years, month)
                        // return console.log(header);/\
                        let xlsx_header = ['User', 'Total Point'].concat(header)

                         // export
                        var ws = XLSX.utils.json_to_sheet(
                            resp.data
                        , {
                            header: xlsx_header
                        });
                        var wb = XLSX.utils.book_new();
                        XLSX.utils.book_append_sheet(wb, ws, 'Rekap');
                        XLSX.writeFile(wb, 'Rekap Absen '+month+ ' ' + years +'.xlsx');

                    } else {
                        $('.toast-header').addClass('bg-warning')
                        $('#toast-title-message').html('FAILED')
                        $('.toast-body').html('Data not found!')
                        $('#liveToast').toast('show')
                    }
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
            this.export()

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
        },
        export: function() {
            $('#exportData').on('click', function() {
                $('#modalExport').modal('show')
            })

            $('#btn-export').on('click', function() {
                let params = {
                    start_date: $('#exp-start-date').val(),
                    end_date: $('#exp-end-date').val()
                }
                // console.log(moment(params.start_date).format('YYYY'));
                ABS.API.Rekap(params)
            })
        }
    }

    ABS.FUNCTION = {
        getDaysArray: function(year, month) {
            let monthIndex = month - 1; // 0..11 instead of 1..12
            let names = [ 'sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat' ];
            let date = new Date(year, monthIndex, 1);
            // console.log(moment(date).format('DD'));
            let result = [];
            while (date.getMonth() == monthIndex) {
                // names[date.getDay()] => get days name
                let get_month = date.getMonth() // get month
                    get_month = parseInt(get_month) + parseInt(1) // get years
                    get_month = get_month < 10 ?  '0' + get_month : get_month
                let get_year = date.getFullYear().toString()

                // result.push(get_month + '/' + date.getDate()  + '/' + get_year);
                result.push(moment(date).format('DD') + '/' + get_month  + '/' + get_year);
                date.setDate(date.getDate() + 1);
            }

            return result;
        }
    }

    ABS.actived()
})
