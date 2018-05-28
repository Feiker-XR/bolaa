<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="RegisterList.aspx.cs" Inherits="Website.Admin.RegisterList" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>预约试驾列表</title>
    <style type="text/css">
        body
        {
            font-size: 12px;
        }
    </style>
</head>
<body>
    <form id="form1" runat="server">
    <div>
    
        <asp:GridView ID="GridView1" runat="server" AllowPaging="True" 
            AutoGenerateColumns="False" BackColor="White" BorderColor="#CCCCCC" 
            BorderStyle="None" BorderWidth="1px" CellPadding="3" DataKeyNames="ID" 
            DataSourceID="SqlDataSource1" PageSize="30" Width="100%">
            <Columns>
                <asp:BoundField DataField="Type" HeaderText="车系" SortExpression="Type" />
                <asp:BoundField DataField="Types" HeaderText="车型" SortExpression="Types" />
                <asp:BoundField DataField="Name" HeaderText="姓名" SortExpression="Name" />
                <asp:BoundField DataField="Phone" HeaderText="电话" SortExpression="Phone" />
                <asp:BoundField DataField="Prov" HeaderText="省" SortExpression="Prov" />
                <asp:BoundField DataField="City" HeaderText="市" SortExpression="City" />
                <asp:BoundField DataField="Dealer" HeaderText="经销商" SortExpression="Dealer" />
                <asp:BoundField DataField="Note" HeaderText="备注" SortExpression="Note" />
                <asp:BoundField DataField="PurchaseTime" HeaderText="预计购买时间" SortExpression="Note" />
                <asp:BoundField DataField="AddTime" HeaderText="预约时间" 
                    SortExpression="AddTime" />
            </Columns>
            <FooterStyle BackColor="White" ForeColor="#000066" />
            <HeaderStyle BackColor="#006699" Font-Bold="True" ForeColor="White" />
            <PagerStyle BackColor="White" ForeColor="#000066" HorizontalAlign="Left" />
            <RowStyle ForeColor="#000066" />
            <SelectedRowStyle BackColor="#669999" Font-Bold="True" ForeColor="White" />
            <SortedAscendingCellStyle BackColor="#F1F1F1" />
            <SortedAscendingHeaderStyle BackColor="#007DBB" />
            <SortedDescendingCellStyle BackColor="#CAC9C9" />
            <SortedDescendingHeaderStyle BackColor="#00547E" />
        </asp:GridView>
        <asp:SqlDataSource ID="SqlDataSource1" runat="server" 
            ConnectionString="<%$ ConnectionStrings:db %>" 
            SelectCommand="SELECT * FROM [Registers] WHERE ([Type] = @Type) ORDER BY [ID] DESC">
            <SelectParameters>
                <asp:SessionParameter Name="Type" SessionField="cartype" Type="String" />
            </SelectParameters>
        </asp:SqlDataSource>
    
    </div>
    </form>
</body>
</html>
