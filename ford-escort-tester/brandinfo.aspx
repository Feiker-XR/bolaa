<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="brandinfo.aspx.cs" Inherits="Website.brandinfo" %>
var wxInfo = {
    code: '<%=this.BrandCode %>',
    name: '<%=this.BrandName %>'
};