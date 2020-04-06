$(function () {

    //menu
    let menudisplay = "off"
    
    $("#searchbtn").click(function(){
        if (menudisplay == "off") {
            $("#selectbg").css("transform","scale(70)")
            setTimeout(function(){$("#searchbar").fadeToggle(1000)},200)
            menudisplay = "on"
        }

        else if (menudisplay == "on") {
            $("#selectbg").css("transform","scale(1)")
            $("#searchbar").fadeToggle()
            menudisplay = "off"
        }
    })

    $("#getData").click(function () {
        $("#searchbar").hide()
        $("#selectbg").css("transform","scale(1)")
        menudisplay = "off"
    })

    //carousell code
    let n = 0
    showSlide(n)

    function showSlide(x) {
        for (let i = 0; i < $(".mycarousel").length; i++) {
            $(".mycarousel").eq(i).hide()
            $(".cindicator").eq(i).css("background-color", "#e3e3e3")
            $(".cindicator").eq(i).mouseover(function () {
                $(this).css("background-color", "#EC4E6D")
            })
            $(".cindicator").eq(i).mouseout(function () {
                $(this).css("background-color", "#e3e3e3")
            })
        }

        

        $(".mycarousel").eq(x).show()
        $(".cindicator").eq(x).css("background-color", "#34495B")
        $(".cindicator").eq(x).mouseover(function () {
            $(this).css("background-color", "#EC4E6D")
        })
        $(".cindicator").eq(x).mouseout(function () {
            $(this).css("background-color", "#34495B")
        })
    }

    $("#next").click(function () {
        if (n == $(".mycarousel").length - 1) {
            n = -1
        }
        showSlide(n += 1)
    })

    $("#prev").click(function () {
        if (n == 0) {
            n = $(".mycarousel").length
        }
        showSlide(n -= 1)
    })

    for (let i = 0; i < $(".mycarousel").length; i++) {
        $(".cindicator").eq(i).click(function () {
            showSlide(i)
        })
    }

    $("#nmdailyc").click(function(){
        showSlide(1)
    })

    $("#nmdailyr").click(function(){
        showSlide(2)
    })

    $("#nmdailyd").click(function(){
        showSlide(3)
    })
    //carousel code end


    let countrylist = []
    loadLatest()

    //adding countries & dates to options
    axios.get("https://pomber.github.io/covid19/timeseries.json").then(function (r) {

        for (let i in r.data) {
            countrylist.push(i)
        }
        countrylist.sort()

        //console.log(countrylist)
        for (let i of countrylist) {
            if (i == "Congo (Kinshasa)") {
                continue
            }
            $("#countryselect").append(`<option value="${i}">${i}</option>`)
        }

        //adding dates to options
        let sgdata = r.data["Singapore"].reverse()

        //converting dates to ISO format
        for (let i of sgdata) {
            if (i.date[6] === "-") {
                i.date = i.date.substr(0, 5) + "0" + i.date.substr(5);
            }
            if (i.date.length < 10) {
                i.date = i.date.substr(0, 8) + "0" + i.date.substr(8);
            }
            i.date = moment(i.date).format("DD/MM/YY")
        }

        for (let i = 0; i < 60; i++) {
            $("#dateselect").append(`<option>${sgdata[i].date}</option>`)
        }

    })//axios for country list

    getTop5()
    getGlobalTotalByDate()

   
    $("#globalbtn").click(function () {
        $("#nmcardl").toggle()
        $("#map").toggle()
    })

    setTimeout(
        function () {
            $("#map").fadeToggle()
        }, 800
    )

})//jquery end