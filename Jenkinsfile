def secret = 'github'
def server = 'ziq@103.187.147.66'
def dir = '/home/ziq/literature-frontend'
def branch = 'production'
def images = 'ziq02/literature-fe:v2'

pipeline{
        agent any
        stages{
                stage ('Delete container and images & git pull'){
                        steps{
                                sshagent([secret]) {
                                        sh """ssh -o StrictHostKeyChecking=no ${server} << EOF
                                        cd ${dir}
                                        #docker-compose down
                                        #docker system prune -f
                                        git pull origin1 ${branch}
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
                                        #docker-compose build
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
        stage ('Send Notification'){
                        steps{
                                discordSend description: 'Frontend Pipeline Succesfull', footer: '', image: '', link: '', result: '', scmWebUrl: '', thumbnail: '', title: 'Jenkins Notif',
                                webhookURL: 'https://discord.com/api/webhooks/1024839606530756639/cDLiwRvd7ESHE1BEk0hEJkUXhnBDximF08i5GbthGZMXmgaKJp8m1VXppUNQUpL0s0Zc'
				}
			}
        }

}
