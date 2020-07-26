using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CDACore.WebApi.Data
{
    public class Repository<TEntity> : IRepository<TEntity> where TEntity : class, IEntity
    {

        private AppDb context;

        public Repository(AppDb context)
        {
            this.context = context;
        }

        public async Task Create(TEntity entity)
        {
            await context.Set<TEntity>().AddAsync(entity);
            await context.SaveChangesAsync();
        }

        public async Task Delete(long id)
        {
            var entity = await Get(id);
            context.Set<TEntity>().Remove(entity);
            await context.SaveChangesAsync();
        }

        public async Task<TEntity> Get(long id)
        {
            return await context.Set<TEntity>().AsNoTracking().FirstOrDefaultAsync(e => e.Id == id);
        }

        public Task<List<TEntity>> GetAll()
        {
            return context.Set<TEntity>().ToListAsync();
        }

        public async Task Update(TEntity entity)
        {
            context.Set<TEntity>().Update(entity);
            await context.SaveChangesAsync();
        }
    }
}
