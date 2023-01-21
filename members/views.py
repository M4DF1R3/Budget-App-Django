from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login, logout
from django.contrib import messages
from django.http import HttpResponse
from .forms import CustomUserCreationForm
from django.urls import reverse_lazy
from django.views.generic import CreateView
from .forms import CustomUserCreationForm
# Create your views here.

def register_view(request, *args, **kwargs):
    form = CustomUserCreationForm(request.POST or None)
    if form.is_valid():
        form.save()
        form = CustomUserCreationForm() # Rerender the form; clears out form
    context = {
        'form': form
    }
    return render(request, 'login.html', {})

class RegisterView(CreateView):
    form_class = CustomUserCreationForm
    template_name = 'register.html'
    success_url = reverse_lazy('login')
    
