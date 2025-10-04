#!/bin/bash

# ===========================================
# SOFLIX - Deploy Script for Cloudflare Pages
# ===========================================

set -e  # Exit on any error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Function to check if command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Function to check prerequisites
check_prerequisites() {
    print_status "Verificando pré-requisitos..."
    
    # Check if npm is installed
    if ! command_exists npm; then
        print_error "npm não está instalado!"
        exit 1
    fi
    
    # Check if wrangler is installed
    if ! command_exists wrangler; then
        print_warning "Wrangler CLI não está instalado!"
        print_status "Instalando Wrangler CLI..."
        npm install -g wrangler
    fi
    
    # Check if user is logged in to Cloudflare
    if ! wrangler whoami >/dev/null 2>&1; then
        print_warning "Você não está logado no Cloudflare!"
        print_status "Fazendo login no Cloudflare..."
        wrangler login
    fi
    
    print_success "Pré-requisitos verificados!"
}

# Function to build the project
build_project() {
    print_status "Fazendo build do projeto..."
    
    # Clean previous build
    if [ -d "dist" ]; then
        print_status "Limpando build anterior..."
        rm -rf dist
    fi
    
    # Run build
    npm run build
    
    # Check if build was successful
    if [ ! -d "dist" ]; then
        print_error "Build falhou! Diretório dist não foi criado."
        exit 1
    fi
    
    print_success "Build concluído com sucesso!"
}

# Function to deploy to preview
deploy_preview() {
    print_status "Deployando para preview..."
    
    wrangler pages deploy dist --project-name soflix
    
    print_success "Deploy para preview concluído!"
}

# Function to deploy to production
deploy_production() {
    print_status "Deployando para produção (branch: main)..."
    
    wrangler pages deploy dist --project-name soflix --branch main
    
    print_success "Deploy para produção concluído!"
}

# Function to show deployment info
show_deployment_info() {
    print_status "Informações do deploy:"
    echo "  📁 Diretório de build: dist/"
    echo "  🌐 Preview: Uma URL de preview será gerada."
    echo "  🎯 Produção: soflix.pages.dev (após o merge na branch 'main')"
    echo "  📊 Dashboard: https://dash.cloudflare.com/pages"
}

# Main function
main() {
    echo "🚀 SOFLIX - Deploy para Cloudflare Pages"
    echo "========================================"
    
    # Parse command line arguments
    DEPLOY_PREVIEW=false
    DEPLOY_PRODUCTION=false
    
    while [[ $# -gt 0 ]]; do
        case $1 in
            --preview)
                DEPLOY_PREVIEW=true
                shift
                ;;
            --production)
                DEPLOY_PRODUCTION=true
                shift
                ;;
            --both)
                DEPLOY_PREVIEW=true
                DEPLOY_PRODUCTION=true
                shift
                ;;
            --help|-h)
                echo "Uso: $0 [opções]"
                echo "Opções:"
                echo "  --preview     Deploy apenas para preview"
                echo "  --production  Deploy apenas para produção"
                echo "  --both        Deploy para ambos (preview e produção)"
                echo "  --help, -h    Mostrar esta ajuda"
                exit 0
                ;;
            *)
                print_error "Opção desconhecida: $1"
                echo "Use --help para ver as opções disponíveis."
                exit 1
                ;;
        esac
    done
    
    # If no options specified, deploy to preview by default
    if [ "$DEPLOY_PREVIEW" = false ] && [ "$DEPLOY_PRODUCTION" = false ]; then
        DEPLOY_PREVIEW=true
        print_status "Nenhuma opção especificada. Deployando para preview por padrão."
        print_status "Use --help para ver todas as opções."
    fi
    
    # Run deployment process
    check_prerequisites
    build_project
    
    if [ "$DEPLOY_PREVIEW" = true ]; then
        deploy_preview
    fi
    
    if [ "$DEPLOY_PRODUCTION" = true ]; then
        deploy_production
    fi
    
    show_deployment_info
    
    print_success "Deploy concluído com sucesso! 🎉"
}

# Run main function with all arguments
main "$@"
