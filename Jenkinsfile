def secret = 'github'
def server = 'ziq@103.187.147.66'
def dir = '/home/ziq/literature-frontend'
def branch = 'production'

pipeline{
        agent any
        stages{
                stage ('Delete container and images & git pull'){
                        steps{
                                sshagent([secret]) {
                                        sh """ssh -o StrictHostKeyChecking=no ${server} << EOF
                                        cd ${dir}
                                        docker-compose down
                                        docker system prune -f
                                        git pull origin ${branch}
                                        exit
                                        EOF"""
                                }
                        }
                }
        stage ('Build Images'){
                        steps{
                                sshagent([secret]) {
                                        sh """ssh -o StrictHostKeyChecking=no ${server} << EOF
                                        cd ${dir}
                                        docker-compose build
                                        exit
                                        EOF"""
                                }
                        }
                }
        stage ('Create Container with compose'){
                        steps{
                                sshagent([secret]) {
                                        sh """ssh -o StrictHostKeyChecking=no ${server} << EOF
                                        cd ${dir}
                                         docker-compose up -d
                                        exit
                                        EOF"""
                                }

                        }

               }

        }

}
