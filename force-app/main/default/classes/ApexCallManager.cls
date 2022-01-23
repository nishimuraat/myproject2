public with sharing class ApexCallManager {
    @AuraEnabled
    public static List<MyCustomObj__c> serachCarRecord( String keyWord , Integer minPrice){
        if ( keyWord == null ) {
            return [
                SELECT
                    Id,
                    Name,
                    maker__c,
                    Price__c
                FROM MyCustomObj__c
                WHERE Price__c >= :minPrice
            ];
        }
        keyWord = keyWord.trim();
        keyWord = '%' + keyWord + '%';
        return [
                SELECT
                    Id,
                    Name,
                    maker__c,
                    Price__c
                FROM MyCustomObj__c
                WHERE Price__c >= :minPrice AND
                    Name LIKE :keyWord
            ];
    }
}
