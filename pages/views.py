from django.http import HttpResponse
from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from .models import Budget, Expense

# User must be logged in
@login_required
def home_view(request, *args, **kwargs):
    user_budgets = Budget.objects.filter(user=request.user)
    selected_budget = None
    if request.method == "POST":
        selected_budget = Budget.objects.get(id=request.POST.get('budget'))
    user_expenses = Expense.objects.filter(budget=selected_budget) if selected_budget else None
    context = {
        'user': request.user.username,
        'budgets': user_budgets,
        'expenses': user_expenses,
    }
    return render(request, 'index.html', context)


    