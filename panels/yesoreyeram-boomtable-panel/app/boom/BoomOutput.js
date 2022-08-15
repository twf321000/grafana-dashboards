System.register(["lodash", "./BoomUtils"], function (exports_1, context_1) {
    "use strict";
    var lodash_1, BoomUtils_1, BoomOutput;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (lodash_1_1) {
                lodash_1 = lodash_1_1;
            },
            function (BoomUtils_1_1) {
                BoomUtils_1 = BoomUtils_1_1;
            }
        ],
        execute: function () {
            BoomOutput = (function () {
                function BoomOutput(options) {
                    this.default_title_for_rows = options.default_title_for_rows || '';
                    this.hide_first_column = options.hide_first_column;
                    this.hide_headers = options.hide_headers;
                    this.text_alignment_firstcolumn = options.text_alignment_firstcolumn || '';
                    this.text_alignment_values = options.text_alignment_values || '';
                    this.first_column_link = options.first_column_link || '#';
                }
                return BoomOutput;
            }());
            exports_1("BoomOutput", BoomOutput);
            BoomOutput.prototype.getDataAsHTML = function (data, sorting_props) {
                var _this = this;
                var getLinkifiedColumn = function (rowName, first_column_link, raw_rowName) {
                    if (first_column_link !== '#') {
                        first_column_link = first_column_link.replace(new RegExp('_row_name_', 'g'), BoomUtils_1.getActualNameWithoutTokens(raw_rowName).trim());
                        rowName = "<a href=\"" + first_column_link + "\" target=\"_blank\">" + rowName + "</a>";
                    }
                    return rowName;
                };
                var output = {
                    body: '',
                };
                if (sorting_props &&
                    sorting_props.col_index !== undefined &&
                    sorting_props.col_index > -1 &&
                    data &&
                    data.output &&
                    data.output.length >= sorting_props.col_index) {
                    var sortFunction_1 = function (a, b, sortMethod) {
                        if (sortMethod === 'asc') {
                            return a[sorting_props.col_index].value - b[sorting_props.col_index].value;
                        }
                        else {
                            return b[sorting_props.col_index].value - a[sorting_props.col_index].value;
                        }
                    };
                    data.output = data.output
                        .filter(function (a) { return !isNaN(a[sorting_props.col_index].value); })
                        .concat(data.output.filter(function (a) { return isNaN(a[sorting_props.col_index].value); }))
                        .sort(function (a, b) { return sortFunction_1(a, b, sorting_props.direction); });
                }
                lodash_1.default.each(data.output, function (o) {
                    if (o.map(function (item) { return item.hidden.toString(); }).indexOf('false') > -1) {
                        output.body += '<tr>';
                        if (_this.hide_first_column !== true) {
                            var raw_rowName = lodash_1.default.first(o.map(function (item) { return item.row_name_raw; }));
                            output.body += "\n                    <td style=\"padding:4px;text-align:" + _this.text_alignment_firstcolumn + "\">\n                        " + getLinkifiedColumn(lodash_1.default.first(o.map(function (item) { return item.row_name; })), String(_this.first_column_link), raw_rowName) + "\n                    </td>";
                        }
                        lodash_1.default.each(o, function (item) {
                            var item_style = "padding:4px;background-color:" + item.color_bg + ";color:" + item.color_text + ";text-align:" + _this.text_alignment_values;
                            var item_display = item.link === '#'
                                ? item.display_value
                                : "<a href=\"" + item.link + "\" target=\"_blank\" style=\"color:" + item.color_text + "\">" + item.display_value + "</a>";
                            var tooltip = !item.tooltip || item.tooltip === '-'
                                ? undefined
                                : " data-toggle=\"tooltip\" data-html=\"true\" data-placement=\"auto\" title=\"" + item.tooltip + "\" ";
                            output.body += "\n                    <td style=\"" + item_style + "\">\n                        " + (tooltip ? "<span " + tooltip + ">" : '') + "\n                            " + item_display + "\n                        " + (tooltip ? "</span>" : '') + "\n                    </td>\n                ";
                        });
                        output.body += '</tr>';
                    }
                });
                return output;
            };
            BoomOutput.prototype.getDataAsDebugHTML = function (data) {
                var debugdata = "";
                debugdata = lodash_1.default.map(data, function (d) {
                    return "\n        <tr>\n            <td style=\"padding:4px;text-align:left;width:30%; title=\"Series Name\" >" + d.seriesName + "</td>\n            <td style=\"padding:4px;text-align:left;width:10%; title=\"Matching Pattern Name\" >" + (d.pattern.name || d.pattern.pattern || 'Default') + "</td>\n            <td style=\"padding:4px;text-align:left;width:10%; title=\"Value : " + String(d.value_formatted || 'null') + " / Raw : " + String(d.value || 'null') + " / Stat : " + d.pattern.valueName + "\">" + d.display_value + "</td>\n            <td style=\"padding:4px;text-align:left;width:10%; title=\"Row name\" >" + d.row_name + "</td>\n            <td style=\"padding:4px;text-align:left;width:10%; title=\"Col name\" >" + d.col_name + "</td>\n            <td style=\"padding:4px;text-align:left;width:10%; title=\"Thresholds\" >" + d.thresholds.join(',') + "</td>\n            <td style=\"padding:4px;text-align:left;width:10%; title=\"BG Color\" >" + d.color_bg + "</td>\n            <td style=\"padding:4px;text-align:left;width:10%; title=\"Text Color\" >" + d.color_text + "</td>\n        </tr>\n        ";
                }).join("");
                return debugdata;
            };
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQm9vbU91dHB1dC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9hcHAvYm9vbS9Cb29tT3V0cHV0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O1lBSUE7Z0JBU0Usb0JBQVksT0FBOEI7b0JBQ3hDLElBQUksQ0FBQyxzQkFBc0IsR0FBRyxPQUFPLENBQUMsc0JBQXNCLElBQUksRUFBRSxDQUFDO29CQUNuRSxJQUFJLENBQUMsaUJBQWlCLEdBQUcsT0FBTyxDQUFDLGlCQUFpQixDQUFDO29CQUNuRCxJQUFJLENBQUMsWUFBWSxHQUFHLE9BQU8sQ0FBQyxZQUFZLENBQUM7b0JBQ3pDLElBQUksQ0FBQywwQkFBMEIsR0FBRyxPQUFPLENBQUMsMEJBQTBCLElBQUksRUFBRSxDQUFDO29CQUMzRSxJQUFJLENBQUMscUJBQXFCLEdBQUcsT0FBTyxDQUFDLHFCQUFxQixJQUFJLEVBQUUsQ0FBQztvQkFDakUsSUFBSSxDQUFDLGlCQUFpQixHQUFHLE9BQU8sQ0FBQyxpQkFBaUIsSUFBSSxHQUFHLENBQUM7Z0JBQzVELENBQUM7Z0JBQ0gsaUJBQUM7WUFBRCxDQUFDLEFBakJELElBaUJDOztZQUNELFVBQVUsQ0FBQyxTQUFTLENBQUMsYUFBYSxHQUFHLFVBQVMsSUFBZ0IsRUFBRSxhQUFhO2dCQUF4QyxpQkErRHBDO2dCQTlEQyxJQUFJLGtCQUFrQixHQUFHLFVBQVMsT0FBZSxFQUFFLGlCQUF5QixFQUFFLFdBQW1CO29CQUMvRixJQUFJLGlCQUFpQixLQUFLLEdBQUcsRUFBRTt3QkFDN0IsaUJBQWlCLEdBQUcsaUJBQWlCLENBQUMsT0FBTyxDQUFDLElBQUksTUFBTSxDQUFDLFlBQVksRUFBRSxHQUFHLENBQUMsRUFBRSxzQ0FBMEIsQ0FBQyxXQUFXLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDO3dCQUM3SCxPQUFPLEdBQUcsZUFBWSxpQkFBaUIsNkJBQXFCLE9BQU8sU0FBTSxDQUFDO3FCQUMzRTtv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TSxDQUM5SCxDQUFDLENBQUMsS0FBSyxJQUFJLE1BQU0sQ0FDbEIsa0JBQWEsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxTQUFTLFdBQUssQ0FBQyxDQUFDLGFBQWEsa0dBQ3lCLENBQUMsQ0FBQyxRQUFRLGtHQUNWLENBQUMsQ0FBQyxRQUFRLG9HQUNSLENBQUMsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxrR0FDeEIsQ0FBQyxDQUFDLFFBQVEsb0dBQ1IsQ0FBQyxDQUFDLFVBQVUsbUNBRXZGLENBQUM7Z0JBQ1IsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO2dCQUNaLE9BQU8sU0FBUyxDQUFDO1lBQ25CLENBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBfIGZyb20gJ2xvZGFzaCc7XG5pbXBvcnQgeyBJQm9vbUhUTUwsIElCb29tVGFibGUsIElCb29tUmVuZGVyaW5nT3B0aW9ucywgSUJvb21TZXJpZXMgfSBmcm9tICcuL2luZGV4JztcbmltcG9ydCB7IGdldEFjdHVhbE5hbWVXaXRob3V0VG9rZW5zIH0gZnJvbSAnLi9Cb29tVXRpbHMnO1xuXG5leHBvcnQgY2xhc3MgQm9vbU91dHB1dCB7XG4gIHB1YmxpYyBkZWZhdWx0X3RpdGxlX2Zvcl9yb3dzOiBTdHJpbmc7XG4gIHB1YmxpYyBoaWRlX2ZpcnN0X2NvbHVtbjogQm9vbGVhbjtcbiAgcHVibGljIGhpZGVfaGVhZGVyczogQm9vbGVhbjtcbiAgcHVibGljIHRleHRfYWxpZ25tZW50X2ZpcnN0Y29sdW1uOiBTdHJpbmc7XG4gIHB1YmxpYyB0ZXh0X2FsaWdubWVudF92YWx1ZXM6IFN0cmluZztcbiAgcHVibGljIGZpcnN0X2NvbHVtbl9saW5rOiBTdHJpbmc7XG4gIHB1YmxpYyBnZXREYXRhQXNIVE1MO1xuICBwdWJsaWMgZ2V0RGF0YUFzRGVidWdIVE1MO1xuICBjb25zdHJ1Y3RvcihvcHRpb25zOiBJQm9vbVJlbmRlcmluZ09wdGlvbnMpIHtcbiAgICB0aGlzLmRlZmF1bHRfdGl0bGVfZm9yX3Jvd3MgPSBvcHRpb25zLmRlZmF1bHRfdGl0bGVfZm9yX3Jvd3MgfHwgJyc7XG4gICAgdGhpcy5oaWRlX2ZpcnN0X2NvbHVtbiA9IG9wdGlvbnMuaGlkZV9maXJzdF9jb2x1bW47XG4gICAgdGhpcy5oaWRlX2hlYWRlcnMgPSBvcHRpb25zLmhpZGVfaGVhZGVycztcbiAgICB0aGlzLnRleHRfYWxpZ25tZW50X2ZpcnN0Y29sdW1uID0gb3B0aW9ucy50ZXh0X2FsaWdubWVudF9maXJzdGNvbHVtbiB8fCAnJztcbiAgICB0aGlzLnRleHRfYWxpZ25tZW50X3ZhbHVlcyA9IG9wdGlvbnMudGV4dF9hbGlnbm1lbnRfdmFsdWVzIHx8ICcnO1xuICAgIHRoaXMuZmlyc3RfY29sdW1uX2xpbmsgPSBvcHRpb25zLmZpcnN0X2NvbHVtbl9saW5rIHx8ICcjJztcbiAgfVxufVxuQm9vbU91dHB1dC5wcm90b3R5cGUuZ2V0RGF0YUFzSFRNTCA9IGZ1bmN0aW9uKGRhdGE6IElCb29tVGFibGUsIHNvcnRpbmdfcHJvcHMpOiBJQm9vbUhUTUwge1xuICBsZXQgZ2V0TGlua2lmaWVkQ29sdW1uID0gZnVuY3Rpb24ocm93TmFtZTogc3RyaW5nLCBmaXJzdF9jb2x1bW5fbGluazogc3RyaW5nLCByYXdfcm93TmFtZTogc3RyaW5nKTogc3RyaW5nIHtcbiAgICBpZiAoZmlyc3RfY29sdW1uX2xpbmsgIT09ICcjJykge1xuICAgICAgZmlyc3RfY29sdW1uX2xpbmsgPSBmaXJzdF9jb2x1bW5fbGluay5yZXBsYWNlKG5ldyBSZWdFeHAoJ19yb3dfbmFtZV8nLCAnZycpLCBnZXRBY3R1YWxOYW1lV2l0aG91dFRva2VucyhyYXdfcm93TmFtZSkudHJpbSgpKTtcbiAgICAgIHJvd05hbWUgPSBgPGEgaHJlZj1cIiR7Zmlyc3RfY29sdW1uX2xpbmt9XCIgdGFyZ2V0PVwiX2JsYW5rXCI+JHtyb3dOYW1lfTwvYT5gO1xuICAgIH1cbiAgICByZXR1cm4gcm93TmFtZTtcbiAgfTtcbiAgbGV0IG91dHB1dDogSUJvb21IVE1MID0ge1xuICAgIGJvZHk6ICcnLFxuICB9O1xuICBpZiAoXG4gICAgc29ydGluZ19wcm9wcyAmJlxuICAgIHNvcnRpbmdfcHJvcHMuY29sX2luZGV4ICE9PSB1bmRlZmluZWQgJiZcbiAgICBzb3J0aW5nX3Byb3BzLmNvbF9pbmRleCA+IC0xICYmXG4gICAgZGF0YSAmJlxuICAgIGRhdGEub3V0cHV0ICYmXG4gICAgZGF0YS5vdXRwdXQubGVuZ3RoID49IHNvcnRpbmdfcHJvcHMuY29sX2luZGV4XG4gICkge1xuICAgIGxldCBzb3J0RnVuY3Rpb24gPSAoYSwgYiwgc29ydE1ldGhvZCkgPT4ge1xuICAgICAgaWYgKHNvcnRNZXRob2QgPT09ICdhc2MnKSB7XG4gICAgICAgIHJldHVybiBhW3NvcnRpbmdfcHJvcHMuY29sX2luZGV4XS52YWx1ZSAtIGJbc29ydGluZ19wcm9wcy5jb2xfaW5kZXhdLnZhbHVlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGJbc29ydGluZ19wcm9wcy5jb2xfaW5kZXhdLnZhbHVlIC0gYVtzb3J0aW5nX3Byb3BzLmNvbF9pbmRleF0udmFsdWU7XG4gICAgICB9XG4gICAgfTtcbiAgICBkYXRhLm91dHB1dCA9IGRhdGEub3V0cHV0XG4gICAgICAuZmlsdGVyKGEgPT4gIWlzTmFOKGFbc29ydGluZ19wcm9wcy5jb2xfaW5kZXhdLnZhbHVlKSlcbiAgICAgIC5jb25jYXQoZGF0YS5vdXRwdXQuZmlsdGVyKGEgPT4gaXNOYU4oYVtzb3J0aW5nX3Byb3BzLmNvbF9pbmRleF0udmFsdWUpKSlcbiAgICAgIC5zb3J0KChhLCBiKSA9PiBzb3J0RnVuY3Rpb24oYSwgYiwgc29ydGluZ19wcm9wcy5kaXJlY3Rpb24pKTtcbiAgfVxuICBfLmVhY2goZGF0YS5vdXRwdXQsIG8gPT4ge1xuICAgIGlmIChvLm1hcChpdGVtID0+IGl0ZW0uaGlkZGVuLnRvU3RyaW5nKCkpLmluZGV4T2YoJ2ZhbHNlJykgPiAtMSkge1xuICAgICAgb3V0cHV0LmJvZHkgKz0gJzx0cj4nO1xuICAgICAgaWYgKHRoaXMuaGlkZV9maXJzdF9jb2x1bW4gIT09IHRydWUpIHtcbiAgICAgICAgbGV0IHJhd19yb3dOYW1lID0gXy5maXJzdChvLm1hcChpdGVtID0+IGl0ZW0ucm93X25hbWVfcmF3KSk7XG4gICAgICAgIG91dHB1dC5ib2R5ICs9IGBcbiAgICAgICAgICAgICAgICAgICAgPHRkIHN0eWxlPVwicGFkZGluZzo0cHg7dGV4dC1hbGlnbjoke3RoaXMudGV4dF9hbGlnbm1lbnRfZmlyc3Rjb2x1bW59XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAke2dldExpbmtpZmllZENvbHVtbihfLmZpcnN0KG8ubWFwKGl0ZW0gPT4gaXRlbS5yb3dfbmFtZSkpLCBTdHJpbmcodGhpcy5maXJzdF9jb2x1bW5fbGluayksIHJhd19yb3dOYW1lKX1cbiAgICAgICAgICAgICAgICAgICAgPC90ZD5gO1xuICAgICAgfVxuICAgICAgXy5lYWNoKG8sIGl0ZW0gPT4ge1xuICAgICAgICBsZXQgaXRlbV9zdHlsZSA9IGBwYWRkaW5nOjRweDtiYWNrZ3JvdW5kLWNvbG9yOiR7aXRlbS5jb2xvcl9iZ307Y29sb3I6JHtpdGVtLmNvbG9yX3RleHR9O3RleHQtYWxpZ246JHt0aGlzLnRleHRfYWxpZ25tZW50X3ZhbHVlc31gO1xuICAgICAgICBsZXQgaXRlbV9kaXNwbGF5ID1cbiAgICAgICAgICBpdGVtLmxpbmsgPT09ICcjJ1xuICAgICAgICAgICAgPyBpdGVtLmRpc3BsYXlfdmFsdWVcbiAgICAgICAgICAgIDogYDxhIGhyZWY9XCIke2l0ZW0ubGlua31cIiB0YXJnZXQ9XCJfYmxhbmtcIiBzdHlsZT1cImNvbG9yOiR7aXRlbS5jb2xvcl90ZXh0fVwiPiR7aXRlbS5kaXNwbGF5X3ZhbHVlfTwvYT5gO1xuICAgICAgICBsZXQgdG9vbHRpcCA9XG4gICAgICAgICAgIWl0ZW0udG9vbHRpcCB8fCBpdGVtLnRvb2x0aXAgPT09ICctJ1xuICAgICAgICAgICAgPyB1bmRlZmluZWRcbiAgICAgICAgICAgIDogYCBkYXRhLXRvZ2dsZT1cInRvb2x0aXBcIiBkYXRhLWh0bWw9XCJ0cnVlXCIgZGF0YS1wbGFjZW1lbnQ9XCJhdXRvXCIgdGl0bGU9XCIke2l0ZW0udG9vbHRpcH1cIiBgO1xuICAgICAgICBvdXRwdXQuYm9keSArPSBgXG4gICAgICAgICAgICAgICAgICAgIDx0ZCBzdHlsZT1cIiR7aXRlbV9zdHlsZX1cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICR7dG9vbHRpcCA/IGA8c3BhbiAke3Rvb2x0aXB9PmAgOiAnJ31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAke2l0ZW1fZGlzcGxheX1cbiAgICAgICAgICAgICAgICAgICAgICAgICR7dG9vbHRpcCA/IGA8L3NwYW4+YCA6ICcnfVxuICAgICAgICAgICAgICAgICAgICA8L3RkPlxuICAgICAgICAgICAgICAgIGA7XG4gICAgICB9KTtcbiAgICAgIG91dHB1dC5ib2R5ICs9ICc8L3RyPic7XG4gICAgfVxuICB9KTtcbiAgcmV0dXJuIG91dHB1dDtcbn07XG5Cb29tT3V0cHV0LnByb3RvdHlwZS5nZXREYXRhQXNEZWJ1Z0hUTUwgPSBmdW5jdGlvbihkYXRhOiBJQm9vbVNlcmllc1tdKTogc3RyaW5nIHtcbiAgbGV0IGRlYnVnZGF0YSA9IGBgO1xuICBkZWJ1Z2RhdGEgPSBfLm1hcChkYXRhLCBkID0+IHtcbiAgICByZXR1cm4gYFxuICAgICAgICA8dHI+XG4gICAgICAgICAgICA8dGQgc3R5bGU9XCJwYWRkaW5nOjRweDt0ZXh0LWFsaWduOmxlZnQ7d2lkdGg6MzAlOyB0aXRsZT1cIlNlcmllcyBOYW1lXCIgPiR7ZC5zZXJpZXNOYW1lfTwvdGQ+XG4gICAgICAgICAgICA8dGQgc3R5bGU9XCJwYWRkaW5nOjRweDt0ZXh0LWFsaWduOmxlZnQ7d2lkdGg6MTAlOyB0aXRsZT1cIk1hdGNoaW5nIFBhdHRlcm4gTmFtZVwiID4ke2QucGF0dGVybi5uYW1lIHx8IGQucGF0dGVybi5wYXR0ZXJuIHx8ICdEZWZhdWx0J308L3RkPlxuICAgICAgICAgICAgPHRkIHN0eWxlPVwicGFkZGluZzo0cHg7dGV4dC1hbGlnbjpsZWZ0O3dpZHRoOjEwJTsgdGl0bGU9XCJWYWx1ZSA6ICR7U3RyaW5nKGQudmFsdWVfZm9ybWF0dGVkIHx8ICdudWxsJyl9IC8gUmF3IDogJHtTdHJpbmcoXG4gICAgICBkLnZhbHVlIHx8ICdudWxsJ1xuICAgICl9IC8gU3RhdCA6ICR7ZC5wYXR0ZXJuLnZhbHVlTmFtZX1cIj4ke2QuZGlzcGxheV92YWx1ZX08L3RkPlxuICAgICAgICAgICAgPHRkIHN0eWxlPVwicGFkZGluZzo0cHg7dGV4dC1hbGlnbjpsZWZ0O3dpZHRoOjEwJTsgdGl0bGU9XCJSb3cgbmFtZVwiID4ke2Qucm93X25hbWV9PC90ZD5cbiAgICAgICAgICAgIDx0ZCBzdHlsZT1cInBhZGRpbmc6NHB4O3RleHQtYWxpZ246bGVmdDt3aWR0aDoxMCU7IHRpdGxlPVwiQ29sIG5hbWVcIiA+JHtkLmNvbF9uYW1lfTwvdGQ+XG4gICAgICAgICAgICA8dGQgc3R5bGU9XCJwYWRkaW5nOjRweDt0ZXh0LWFsaWduOmxlZnQ7d2lkdGg6MTAlOyB0aXRsZT1cIlRocmVzaG9sZHNcIiA+JHtkLnRocmVzaG9sZHMuam9pbignLCcpfTwvdGQ+XG4gICAgICAgICAgICA8dGQgc3R5bGU9XCJwYWRkaW5nOjRweDt0ZXh0LWFsaWduOmxlZnQ7d2lkdGg6MTAlOyB0aXRsZT1cIkJHIENvbG9yXCIgPiR7ZC5jb2xvcl9iZ308L3RkPlxuICAgICAgICAgICAgPHRkIHN0eWxlPVwicGFkZGluZzo0cHg7dGV4dC1hbGlnbjpsZWZ0O3dpZHRoOjEwJTsgdGl0bGU9XCJUZXh0IENvbG9yXCIgPiR7ZC5jb2xvcl90ZXh0fTwvdGQ+XG4gICAgICAgIDwvdHI+XG4gICAgICAgIGA7XG4gIH0pLmpvaW4oYGApO1xuICByZXR1cm4gZGVidWdkYXRhO1xufTtcbiJdfQ==