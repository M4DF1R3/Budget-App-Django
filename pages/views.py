from django.http import HttpResponse
from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login, logout

from .models import Budget, Expense

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

def login_view(request, *args, **kwargs):
    if request.method == 'POST':
        username = request.POST['username']
        password = request.POST['password']
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            return redirect('home')
        else:
            pass # Return an 'invalid login' error message
    else:
        return render(request, 'login.html', {})
    