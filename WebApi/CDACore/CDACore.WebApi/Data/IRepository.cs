using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CDACore.WebApi.Data
{
    public interface IRepository<TEntity> where TEntity : class, IEntity
    {
        Task<List<TEntity>> GetAll();
        Task<TEntity> Get(long id);
        Task Create(TEntity entity);
        Task Update(TEntity entity);
        Task Delete(long id);
    }
}
