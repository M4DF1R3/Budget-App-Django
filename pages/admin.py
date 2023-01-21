from django.contrib import admin
from .models import Budget, Expense
# Register your models here.
admin.site.register(Budget)


# class ExpenseAdmin(admin.ModelAdmin):
#     list_display = ('__str__', 'username')
#     search_fields = ('description', 'budget__user__username')

#     def username(self, obj):
#         return obj.budget.user.username
#     username.short_description = 'Username'
class ExpenseAdmin(admin.ModelAdmin):
    list_display = ('__str__', 'username','budget_month')
    search_fields = ('description', 'budget__user__username')

    def username(self, obj):
        return obj.budget.user.username
    username.short_description = 'Username'
    
    def budget_month(self, obj):
        return obj.budget.month
    budget_month.short_description = 'Budget Month'
    
admin.site.register(Expense, ExpenseAdmin)
