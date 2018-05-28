<%@ Page Title="经销商查询" Language="C#" MasterPageFile="~/SiteMaster.Master" AutoEventWireup="true" CodeBehind="Query.aspx.cs" Inherits="Website.Query" %>
<asp:Content ID="Content1" ContentPlaceHolderID="HeadArea" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="Main" runat="server">
    <div class="query">
    	<div class="tip">从列表中选择您想要的经销商</div>
        <div class="form">
            <form action="Query.aspx?type=<%=BrandCode %>" method="post" id="qform">
        	<a class="btn" onclick="document.getElementById('qform').submit();">确定</a>
            <div class="box">
            	<input type="text" name="search" value="<%=Server.HtmlEncode(searchWord) %>" class="txtbox" placeholder="按城市搜索" />
            </div>
            </form>
        </div>

        <%
            if (listTable != null && listTable.Rows.Count > 0)
            {
        %>
        <div class="results">
            <%
                foreach (System.Data.DataRow row in listTable.Rows)
                {
            %>
            <a class="dealer" href="View.aspx?id=<%=row["ID"] %>&type=<%=BrandCode %>" target="_blank">
            	<b><%=Server.HtmlEncode(CommonLibrary.Convert.ToString(row["Name"])) %></b>
                <p>
                地址：<%=Server.HtmlEncode(CommonLibrary.Convert.ToString(row["Address"])) %><br />
                邮编：<%=Server.HtmlEncode(CommonLibrary.Convert.ToString(row["PostCode"])) %><br />
                电话：<%=Server.HtmlEncode(CommonLibrary.Convert.ToString(row["Phone"])) %>
                </p>
            </a>
            <%
                }
            %>
        </div>
        <%
            }
        %>
    </div>
</asp:Content>
