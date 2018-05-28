using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Web
{
    /// <summary>
    /// SubmitInfo 的摘要说明
    /// </summary>
    public class SubmitInfo : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            using(DatabaseClient.DatabaseClient db = new DatabaseClient.DatabaseClient("db"))
            {
                string sql = "INSERT INTO trylogs (name, phone, prov, city) VALUES (@name, @phone, @prov, @city)";
                db.RunQuery(sql, new System.Data.Common.DbParameter[] {
                    db.CreateParameter("name",context.Request["name"], System.Data.ParameterDirection.Input),
                    db.CreateParameter("phone",context.Request["phone"], System.Data.ParameterDirection.Input),
                    db.CreateParameter("prov",context.Request["prov"], System.Data.ParameterDirection.Input),
                    db.CreateParameter("city",context.Request["city"], System.Data.ParameterDirection.Input)
                });
            }
        }

        public bool IsReusable
        {
            get
            {
                return true;
            }
        }
    }
}