#!/bin/bash

# ===========================================
# SOFLIX - Deploy Script for Vercel
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
    
    # Check if vercel CLI is installed
    if ! command_exists vercel; then
        print_warning "Vercel CLI não está instalado!"
        print_status "Instalando Vercel CLI..."
        npm install -g vercel
    fi
    
    print_success "Pré-requisitos verificados!"
}

# Function to deploy to preview
deploy_preview() {
    print_status "Deployando para preview..."
    
    vercel --yes
    
    print_success "Deploy para preview concluído!"
}

# Function to deploy to production
deploy_production() {
    print_status "Deployando para produção..."
    
    vercel --prod --yes
    
    print_success "Deploy para produção concluído!"
}

# Function to show deployment info
show_deployment_info() {
    print_status "Informações do deploy:"
    echo "  📁 Framework: Vite + React"
    echo "  🌐 Build Command: npm run build"
    echo "  📂 Output Directory: dist"
    echo "  📊 Dashboard: https://vercel.com/dashboard"
}

# Main function
main() {
    echo "🚀 SOFLIX - Deploy para Vercel"
    echo "==============================="
    
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
