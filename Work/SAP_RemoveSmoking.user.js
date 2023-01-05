// ==UserScript==
// @name           SAP - Remove Smoking
// @namespace      Flex
// @version        1.1
// @description    remove all smoking
// @author         FlexNiko
// @include        https://hr-selfservice.intra.men.de:44309/sap/bc/ui5_ui5/ui2/ushell/shells/abap/FioriLaunchpad.html*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/2.1.0/jquery.min.js
// @require        https://gist.github.com/raw/2625891/waitForKeyElements.js
// ==/UserScript==

//if(window.location.href == "https://hr-selfservice.intra.men.de:44309/sap/bc/ui5_ui5/ui2/ushell/shells/abap/FioriLaunchpad.html#LeaveRequest-manage") {
//waitForKeyElements('#application-LeaveRequest-manage-component---overview--leaveRequestTable', removeSmoking);
waitForKeyElements('[id^=application-LeaveRequest-manage-component---overview--leaveRequestColumnListItem-application-LeaveRequest-manage-component---overview--leaveRequestTable-', removeSmoking);

//}
function removeSmoking() {
    var row = $(".sapMLIB.sapMLIB-CTX.sapMLIBShowSeparator.sapMLIBTypeNavigation.sapMLIBActionable.sapMLIBHoverable.sapMLIBFocusable.sapMListTblRow");
    for(var i = 0; i < row.length; i++) {
        if(row[i].firstElementChild.nextElementSibling.innerText == "Raucherpause") {
            row[i].style.display = "none";
        }
    }
}

// fix: script wouldnt load when pressing BACK
window.onunload = function() {};
